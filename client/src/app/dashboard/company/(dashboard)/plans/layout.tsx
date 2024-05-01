import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper title="My Plan's">{children}</DashboardWrapper>;
}
