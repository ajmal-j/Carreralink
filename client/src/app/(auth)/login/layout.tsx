import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Carreralink.live",
  referrer: "origin-when-cross-origin",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
