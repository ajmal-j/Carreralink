import { cn } from "@/lib/utils";
import React from "react";

interface PropTypes {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function SecondaryButton({
  children,
  className,
  onClick,
  type,
}: PropTypes) {
  return (
    <button
      className={cn(
        "w-full rounded-full border-[0.2px] border-white/20 bg-secondaryColor py-1.5 text-sm text-white text-white/90 transition-all duration-200 hover:bg-violet-900 ",
        className,
      )}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
