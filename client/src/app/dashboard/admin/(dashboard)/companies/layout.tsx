import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import Tab from "@/components/Layout/Tab";
import { ReactNode } from "react";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardWrapper title="Companies">
      <Tab />
      {children}
    </DashboardWrapper>
  );
}
