import fetchData from "@/utils/fetch";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import KeyList from "./KeyList";

type RankListProps = {
  itemType: string;
};

export default async function RankList({ itemType }: RankListProps) {
  const shortcuts = await fetchData<Shortcut[]>(`/shortcut-keys/allrank`);

  return (
    <div>
      {shortcuts?.map((item, index) => (
        <Link
          href={`/pages/list/${item.platform}?searchId=${item.keys_list.join(
            "+"
          )}`}
          key={item.id}
        >
          <div className="flex justify-between py-[10px]  px-[12px] w-full">
            <div className="flex items-center">
              <p className="text-primary font-bold  mr-[10px] text-[16px] w-[15px]">
                {index + 1}
              </p>
              <div className="mr-[10px]">
                <Image
                  src={process.env.NEXT_PUBLIC_SERVER_URI + item.image}
                  alt="logo"
                  width={16}
                  height={16}
                />
              </div>
              <div>
                <KeyList keys={item.keys_list} isActive={false} />
              </div>
            </div>
            <div>
              <Image
                src={"/icons/CaretRight.svg"}
                alt="logo"
                width={16}
                height={16}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}