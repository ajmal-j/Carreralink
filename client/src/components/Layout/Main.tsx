import React, { ReactNode } from "react";
import UserHeader from "./UserHeader";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "./BreadCrums";

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
      {/* <Breadcrumbs /> */}
      <div className={cn("mb-3 mt-3 flex-grow", className)}>{children}</div>
      <Footer />
    </div>
  );
}
