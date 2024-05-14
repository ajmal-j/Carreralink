import { ReactNode } from "react";

export const metadata = {
  title:"Login | Carreralink.live",
  referrer:"origin",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
