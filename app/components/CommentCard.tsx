import Image from "next/image";
import Blank from "./Blank";

type CommunityCardProps = {
  userName: string;
  imgSrc: string;
  createdAt: string;
  mainText: string;
  isMain: boolean;
};

export default function CommentCard({
  userName,
  imgSrc,
  createdAt,
  mainText,
  isMain,
}: CommunityCardProps) {
  return (
    <>
      <div>
        <div className="bg-opacity-100 border-t border-gray100 px-4">
          <div className="flex items-center gap-[10px] pt-5">
            <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
              <Image src={imgSrc} alt={"profile"} width={30} height={30} />
            </div>
            <div className="w-[77px] h-[38px]">
              <p className="font-medium text-base">{userName}</p>
              <p className="text-xs text-gray300 ">{createdAt}</p>
            </div>
          </div>
          <Blank height="20px" />
          <div className="font-[#222222] pl-[40px] text-base leading-[150%]">
            {mainText}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
