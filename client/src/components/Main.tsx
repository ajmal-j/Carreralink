import React, { ReactNode } from "react";
import UserHeader from "./UserHeader";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export default function Main({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-[120vh] flex-col">
      <UserHeader />
      <div className={cn("mb-3 mt-3 flex-grow", className)}>{children}</div>
      <Footer />
    </div>
  );
}
