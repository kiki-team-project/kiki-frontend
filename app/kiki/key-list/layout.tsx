"use client";

import Blank from "@/app/components/Blank";
import Container from "@/app/components/Container";
import ProgramsMenu from "@/app/components/Web/ProgramsMenu";
import { useFooterStore } from "@/store/FooterStore";

export default function KeyListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container>
        <div className="flex justify-center">
          <div className="flex gap-6">
            <div className="w-[280px] h-full">
              <ProgramsMenu />
            </div>
            <div>{children}</div>
            <div className="w-[280px]"></div>
          </div>
        </div>
      </Container>
    </>
  );
}
