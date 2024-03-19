import Main from "@/components/Layout/Main";
import Wrapper from "@/components/Custom/Wrapper";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Wrapper>
      <Main className="mt-5 px-2">{children}</Main>
    </Wrapper>
  );
}
