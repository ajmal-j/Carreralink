import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { ThemeToggler } from "./theme-toggler";
import Image from "next/image";
import Link from "next/link";
import {
  BackpackIcon,
  Component1Icon,
  ExitIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

export default function UserHeader() {
  return (
    <header className="z-10 flex items-center justify-between rounded-full border-[0.2px] bg-background px-6 py-3">
      <div className="flex items-center gap-1">
        <Image
          alt="CarreraLink"
          className="dark:invert"
          src="/logo.svg"
          width={23}
          height={23}
        />
        <div className="font-montserrat text-lg font-bold">CarreraLink</div>
      </div>
      <div className="hidden flex-1 justify-end gap-3 px-3 font-montserrat text-foreground/60 md:flex">
        <Link className="hover:text-foreground" href="/jobs">
          Jobs
        </Link>
        <Link className="hover:text-foreground" href="/companies">
          Companies
        </Link>
        <Link className="hover:text-foreground" href="/hire">
          Hire
        </Link>
        <Link className="hover:text-foreground" href="/about">
          About
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end md:hidden">
        <MobileNav />
      </div>
      <ThemeToggler />
    </header>
  );
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild className="mx-3 cursor-pointer">
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 pb-5 pt-10">
          <span className="flex items-center rounded-2xl py-1.5 ps-5 text-foreground/70 transition-all duration-150 hover:bg-foreground/20 hover:text-foreground">
            <BackpackIcon className="mr-2 h-4 w-4 text-foreground" />
            <Link href="/jobs">Jobs</Link>
          </span>
          <span className="flex items-center rounded-2xl py-1.5 ps-5 text-foreground/70 transition-all duration-150 hover:bg-foreground/20 hover:text-foreground">
            <Component1Icon className="mr-2 h-4 w-4 text-foreground" />
            <Link href="/companies">Companies</Link>
          </span>
          <span className="flex items-center rounded-2xl py-1.5 ps-5 text-foreground/70 transition-all duration-150 hover:bg-foreground/20 hover:text-foreground">
            <FileTextIcon className="mr-2 h-4 w-4 text-foreground" />
            <Link href="/hire">Hire</Link>
          </span>
          <span className="flex items-center rounded-2xl py-1.5 ps-5 text-foreground/70 transition-all duration-150 hover:bg-foreground/20 hover:text-foreground">
            <InfoCircledIcon className="mr-2 h-4 w-4 text-foreground" />
            <Link href="/about">About</Link>
          </span>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <ExitIcon className="mr-2 h-4 w-4 text-foreground" />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
