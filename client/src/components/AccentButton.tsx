import { cn } from "@/lib/utils";
import React from "react";

interface PropTypes {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function AccentButton({
  children,
  className,
  onClick,
  type,
}: PropTypes) {
  return (
    <button
      className={cn(
        "w-full rounded-full border-[0.2px] border-white/20 bg-purple-600 py-1.5 text-sm text-white text-white/90 transition-all duration-200 hover:bg-purple-500  ",
        className,
      )}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
