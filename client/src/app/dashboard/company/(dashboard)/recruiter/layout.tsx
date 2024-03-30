import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import RecruiterTab from "./Tab";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <DashboardWrapper title="Recruiter's">
      <RecruiterTab />
      {children}
    </DashboardWrapper>
  );
}
