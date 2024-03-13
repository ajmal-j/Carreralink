"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ThemeToggler() {
  const { setTheme } = useTheme();

  return (
    <div className="cursor-pointer rounded-full border p-2">
      <SunIcon
        className="text-foreground dark:hidden"
        onClick={() => setTheme("dark")}
      />
      <MoonIcon
        className="hidden text-foreground dark:block"
        onClick={() => setTheme("light")}
      />
    </div>
  );
}
