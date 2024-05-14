import { ReactNode } from "react";

export const metadata = {
  title:"Login | Carreralink",
  origin:"origin-when-cross-origin",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
