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
}

export default function PrimaryButton({
  children,
  className,
  onClick,
  icon,
  disabled,
  type,
  href,
}: PropTypes) {
  const { push } = useRouter();
  return (
    <button
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center rounded-full border-[0.2px] border-white/20 bg-primaryColor py-1.5 text-sm text-white text-white/90 transition-all duration-200 hover:bg-violet-600 ",
        className,
      )}
      onClick={href ? () => push(href) : onClick}
      type={type || "button"}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
