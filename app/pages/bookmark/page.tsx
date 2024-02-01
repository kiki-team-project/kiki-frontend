"use client";
import Link from "next/link";
import MainContainer from "../../components/MainContainer";
import ListCard from "./ListCard";
import RadioContainer from "../../components/RadioContainer";
import ToggleButton from "../../components/Button/ToggleButton";
import ProgramList from "../../components/ProgramList";
import Blank from "../../components/Blank";
import { useEffect, useState } from "react";
import BookmarkKeys from "./BookmarkKeys";
import Main from "../../components/Main";
import HeaderLeftText from "../../components/header/HeaderLeftText";
import Footer from "../../components/Footer";

export default function Bookmark() {
  const [selectedItem, setSelectedItem] = useState<string | null>("프로그램");

  return (
    <>
      <HeaderLeftText text="즐겨찾기" />
      <Main>
        <Blank height="30px" />
        <div className="flex justify-center">
          <ToggleButton
            items={["프로그램", "단축키"]}
            setItem={setSelectedItem}
          />
        </div>

        {selectedItem === "프로그램" && (
          <>
            <Blank height="30px" />
            <ProgramList items={["Figma", "test2", "test3", "test4"]} />
          </>
        )}
        {selectedItem === "단축키" && <BookmarkKeys />}
      </Main>
      <Footer selected="bookmark" />
    </>
  );
}