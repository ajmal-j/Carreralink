import { ReactNode } from "react";
import MyJobTab from "./Tab";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MyJobTab />
      <div>{children}</div>
    </div>
  );
}
