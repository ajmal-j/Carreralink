"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface PropTypes {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  href?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

export default function PrimaryButton({
  children,
  className,
  onClick,
  icon,
  disabled,
  type,
  href,
  size,
}: PropTypes) {
  const { push } = useRouter();
  return (
    <button
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center rounded-full border-[0.2px] border-white/20 bg-primaryColor py-1.5 text-sm text-white text-white/90 transition-all duration-200 hover:bg-violet-600 disabled:pointer-events-none disabled:opacity-50",
        className,
        size && sizes[size],
      )}
      onClick={href ? () => push(href) : onClick}
      type={type || "button"}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
