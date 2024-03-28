import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <DashboardWrapper title="User's">{children}</DashboardWrapper>;
}
