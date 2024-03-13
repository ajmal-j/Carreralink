import React from "react";
import UserHeader from "./UserHeader";
import { Footer } from "./Footer";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[120vh] flex-col">
      <UserHeader />
      <div className="mb-3 mt-3 flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
