import { cn } from "@/lib/utils";
import React from "react";

interface PropTypes {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function PrimaryButton({
  children,
  className,
  onClick,
  icon,
  type,
}: PropTypes) {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-center rounded-full border-[0.2px] border-white/20 bg-primaryColor py-1.5 text-sm text-white text-white/90 transition-all duration-200 hover:bg-violet-600 ",
        className,
      )}
      onClick={onClick}
      type={type || "button"}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
