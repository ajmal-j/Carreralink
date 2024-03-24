import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { ReactNode } from "react";
import Tab from "./Tab";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardWrapper title="Companies">
      <Tab />
      {children}
    </DashboardWrapper>
  );
}
