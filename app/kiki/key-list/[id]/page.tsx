"use client";

import Blank from "@/app/components/Blank";
import Keyboard from "@/app/components/Web/Keyboard";
import SearchInput from "@/app/components/ClientSearchInput";
import KeyList from "@/app/components/KeyList";
import Image from "next/image";
import BookMark from "@/app/components/icon/BookMark";

import Fuse from "fuse.js";
import { useEffect, useState, useRef } from "react";
import { useNoneUserStore } from "@/store/NoneUserStore";

import { isUserLoggedIn } from "@/utils/storage";
import useBookmark from "@/app/hooks/useBookmark";

const options = {
  includeScore: true,
  keys: ["keys_list", "description"],
};

export default function KeyListPage({ params }: { params: { id: string } }) {
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState("auto");

  const data = useNoneUserStore((state) => state.shortcuts);
  const getShortcuts = useNoneUserStore((state) => state.getShortcuts);
  const shortcutPopular = useNoneUserStore((state) => state.shortcutPopular);
  const getShortcutPopular = useNoneUserStore(
    (state) => state.getShortcutPopular
  );

  const bookmark = useBookmark();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const fuse = new Fuse(data, options);
  const [isLoading, setIsLoading] = useState(true);
  const [searchId, setSearchId] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("전체");

  const [activeKeyId, setActiveKeyId] = useState<string | null>(null);
  const [activeKeyList, setActiveKeyList] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const searchIdValue = queryParams.get("searchId");

      setSearchTerm(searchIdValue || "");
    }
  }, []);

  useEffect(() => {
    const fetchShortcuts = async () => {
      setIsLoading(true);
      await getShortcuts(params.id);

      if (isUserLoggedIn()) {
        bookmark?.onBookmarkInit();
      }

      setIsLoading(false);
    };
    setSearchResults([]);
    fetchShortcuts();
  }, [params.id, getShortcuts, getShortcutPopular]);

  useEffect(() => {
    if (selectedFilter === "추천") {
      setSearchResults(shortcutPopular);
      setActiveKeyId(shortcutPopular[0]?.id);
    } else if (selectedFilter === "전체") {
      setSearchResults(data);
      setActiveKeyId(data[0]?.id);
    }
  }, [data, shortcutPopular, selectedFilter]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = fuse.search(searchTerm).map((result) => result.item);
      setSearchResults(results);
      setActiveKeyId(results[0]?.id);
    } else {
      if (selectedFilter === "추천") {
        setSearchResults(shortcutPopular);
        setActiveKeyId(shortcutPopular[0]?.id);
      } else if (selectedFilter === "전체") {
        setSearchResults(data);
        setActiveKeyId(data[0]?.id);
      }
    }
  }, [searchTerm, data]);

  useEffect(() => {
    const calculateAndSetDivHeight = () => {
      // 스크롤 가능한 div의 상단 위치를 계산합니다.
      const divTop = scrollableDivRef.current?.getBoundingClientRect().top ?? 0;
      // 뷰포트 높이에서 div의 상단 위치를 빼서 div의 높이를 계산합니다.
      const calculatedHeight = window.innerHeight - divTop;
      setDivHeight(`${calculatedHeight}px`);
    };

    // 컴포넌트 마운트 시와 브라우저 창 크기 변경 시에 높이를 재계산합니다.
    calculateAndSetDivHeight();
    window.addEventListener("resize", calculateAndSetDivHeight);

    // cleanup function
    return () => {
      window.removeEventListener("resize", calculateAndSetDivHeight);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <div>
      <div className="w-[588px]">
        <Blank height="60px" />
        <div className="flex justify-center">
          <Keyboard
            keys={
              searchResults && searchResults.length > 0 ? activeKeyList : []
            }
          />
        </div>
        <Blank height="50px" />
        <SearchInput
          onChange={handleSearchChange}
          placeholder="궁금한 기능을 검색해 보세요."
          color="white"
        />
        <Blank height="50px" />

        <div className="flex h-[60px] w-[588px] py-[10px] pl-[30px] pr-[3px]">
          <div className="w-[250px] text-gray300 font-semibold">문자</div>
          <div className="flex gap-2 items-center">
            <div className="cursor-pointer h-[40px] w-[40px]">
              <Image
                alt="logo"
                src="/icons/web-icons/mac.svg"
                width={18}
                height={20}
              />
            </div>
            <div className="cursor-pointer  h-[40px] w-[40px]">
              <Image
                alt="logo"
                src="/icons/web-icons/window.svg"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <Blank height="20px" />
        <div className="">
          <div
            className="flex items-center  flex-col scrollable-div"
            ref={scrollableDivRef}
            style={{ height: divHeight }}
          >
            {!isLoading &&
              searchResults?.map((item, index) => {
                return (
                  <div className="flex " key={item.id}>
                    <div
                      onClick={() => {
                        setActiveKeyId(item.id);
                        setActiveKeyList(item.keys_list);
                      }}
                      className="flex items-center rounded-lg h-[60px] w-[588px] py-[10px] pl-[30px] pr-[3px] hover:bg-gray100 hover:text-primary transition duration-300 ease-in-out"
                    >
                      <div className="w-[250px]">
                        <p
                          className={`${
                            activeKeyId === item.id
                              ? "text-primary"
                              : "text-black"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                      <div className="flex w-80 justify-between">
                        <div className="flex justify-between items-center ">
                          <div className="flex mx-[4px]">
                            <KeyList
                              keys={item.keys_list}
                              isActive={activeKeyId === item.id}
                            />
                          </div>
                        </div>
                        <div
                          key={item.id}
                          className="flex w-[50px] items-center"
                        >
                          <div className="">
                            <BookMark
                              size={24}
                              isChecked={false}
                              bookmarkType="단축키"
                              id={item.id}
                              platform={params.id}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
