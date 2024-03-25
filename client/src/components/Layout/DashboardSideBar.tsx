"use client";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
  CaretRightIcon,
  ExitIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Title from "../Custom/Title";

interface IPage {
  items: {
    title: string;
    icon: ReactNode;
    href: string;
  }[];
  logOut: () => void;
}

export default function DashboardSideBar({ items, logOut }: IPage) {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden w-[35%] min-w-[200px] max-w-[320px] pe-1 lg:block ">
        <div className="sticky top-28 flex h-full max-h-[85vh] w-full flex-col items-center gap-5 overflow-y-scroll pb-10 pe-2">
          {items.map(({ href, icon, title }, indx) => (
            <motion.div
              key={indx}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.8 }}
            >
              <Link
                href={href}
                className={`flex w-full items-center justify-between gap-3 rounded-[16px] bg-gradient-to-r  ${pathname === href || pathname.split("/").slice(0, 4).join("/") === href ? "from-primaryColor from-60% to-violet-400 font-semibold text-white shadow-lg shadow-foreground/10" : "hover:bg-foreground/10"} py-2.5 pe-2 ps-3 transition-colors duration-200 hover:opacity-90 `}
              >
                <div className="flex items-center gap-3">
                  <span>{icon}</span>
                  <span>{title}</span>
                </div>
                <CaretRightIcon className={`size-[21px] `} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="block px-3 lg:hidden">
        <MobileNav logOut={logOut} items={items} pathname={pathname} />
      </div>
    </>
  );
}

type IMobileNav = {
  pathname: string;
} & IPage;

export function MobileNav({ items, pathname, logOut }: IMobileNav) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet key={"left"} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className=" sticky top-24">
        <Button variant="outline" className="mt-3">
          <HamburgerMenuIcon className="size-[22px]" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="max-w-[360px]">
        <SheetHeader>
          <SheetTitle>
            <Title />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 pb-10 pt-16">
          {items.map(({ href, icon, title }, indx) => (
            <motion.div
              key={indx}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.8 }}
            >
              <Link
                key={indx}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex w-full items-center justify-between gap-3 rounded-[16px] bg-gradient-to-r  ${pathname === href || pathname.split("/").slice(0, 4).join("/") === href ? "from-primaryColor from-60% to-violet-400 font-semibold text-white shadow-lg shadow-foreground/20" : "hover:bg-foreground/10"} py-2 pe-2 ps-3 transition-colors duration-200 hover:opacity-90 `}
              >
                <div className="flex items-center gap-3">
                  <span>{icon}</span>
                  <span>{title}</span>
                </div>
                <CaretRightIcon className={`size-[21px]`} />
              </Link>
            </motion.div>
          ))}
        </div>
        <SheetFooter className="absolute bottom-5 right-5">
          <SheetClose asChild>
            <form action={logOut}>
              <Button
                type="submit"
                variant={"secondary"}
                onClick={logOut}
                className="mt-auto flex gap-2 text-foreground/50"
              >
                Log out <ExitIcon />
              </Button>
            </form>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
