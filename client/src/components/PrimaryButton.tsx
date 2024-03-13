import { cn } from "@/lib/utils";
import React from "react";

interface PropTypes {
  children: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function PrimaryButton({
  children,
  className,
  onClick,
  type,
}: PropTypes) {
  return (
    <button
      className={cn(
        "w-full rounded-full border-[0.2px] border-white/20 bg-primary py-1.5 text-sm text-white text-white/90 transition-all duration-200 hover:bg-primary/80 hover:bg-violet-700",
        className,
      )}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
