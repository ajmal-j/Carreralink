import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardWrapper title="Job's">{children}</DashboardWrapper>;
}
