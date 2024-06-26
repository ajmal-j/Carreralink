import { cn } from "@/lib/utils";
import React from "react";

interface PropTypes {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "default" | "sm" | "lg" | "icon";
}

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

export default function AccentButton({
  children,
  className,
  onClick,
  type,
  size,
}: PropTypes) {
  return (
    <button
      className={cn(
        "w-full rounded-full border-[0.2px] border-white/20 bg-purple-600 py-1.5 text-sm text-white text-white/90 transition-all duration-200 hover:bg-purple-500  ",
        className,
        size && sizes[size],
      )}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
