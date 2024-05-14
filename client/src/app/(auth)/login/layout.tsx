import { ReactNode } from "react";

export const metadata = {
  title:"Login | Carreralink",
  referrer:"origin",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
