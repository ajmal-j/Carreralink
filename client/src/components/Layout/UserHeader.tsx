"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { ThemeToggler } from "../Buttons/theme-toggler";
import Image from "next/image";
import Link from "next/link";
import {
  BackpackIcon,
  Component1Icon,
  ExitIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  InfoCircledIcon,
  TextAlignRightIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import PrimaryButton from "../Buttons/PrimaryButton";
import { usePathname } from "next/navigation";
import { currentUser } from "@/services/user.service";
import { useStateSelector } from "@/store";
import { useDispatch } from "react-redux";
import { logout, setUser } from "@/store/reducers/user.slice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserHeader({ logOut }: { logOut: () => void }) {
  const { isAuth, user } = useStateSelector((state) => state.user);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      try {
        const data = await currentUser();
        dispatch(setUser(data?.data));
      } catch (error) {
        console.log(error);
      }
    })();
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className="z-10 flex items-center justify-between rounded-full border-[0.2px] bg-background px-6 py-3">
      <Link href="/">
        <div className="flex items-center gap-1">
          <Image
            alt="CarreraLink"
            className="dark:invert"
            src="/logo.svg"
            width={23}
            height={23}
          />
          <h1 className="font-montserrat text-lg font-bold">CarreraLink</h1>
        </div>
      </Link>
      <div className="hidden flex-1 items-center justify-end gap-4 px-3  text-foreground/60 md:flex">
        <Link className="hover:text-foreground" href="/jobs">
          Jobs
        </Link>
        {pathname === "/companies" ? (
          <Link className="hover:text-foreground" href="/companies/new">
            RegisterCompany
          </Link>
        ) : (
          <Link className="hover:text-foreground" href="/companies">
            Companies
          </Link>
        )}
        <Link className="hover:text-foreground" href="/hire">
          Hire
        </Link>
        <Link className="hover:text-foreground" href="/about">
          About
        </Link>
      </div>
      <div className="flex flex-1 md:flex-none justify-end ">
        <ThemeToggler />
      </div>
      {isAuth ? (
        <ProfileDropDown logOut={logOut}>
          <Avatar className="ms-3 cursor-pointer">
            <AvatarImage src={user?.profile} />
            <AvatarFallback>
              <TokensIcon />
            </AvatarFallback>
          </Avatar>
        </ProfileDropDown>
      ) : visible ? (
        <Link className="my-[0.20rem] ms-3 hover:text-foreground" href="/login">
          <PrimaryButton className="w-min px-5">login</PrimaryButton>
        </Link>
      ) : (
        <Link className="my-[0.20rem] ms-3 hover:text-foreground" href="/login">
          <PrimaryButton className="w-min animate-pulse bg-violet-500 px-5 duration-1000">
            login
          </PrimaryButton>
        </Link>
      )}
      <div className="ms-3 flex items-center justify-end rounded-full border border-foreground/5 bg-white/10 px-1.5 py-1.5 md:hidden">
        <MobileNav />
      </div>
    </header>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <TextAlignRightIcon className="size-7" />
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
            {pathname === "/companies" ? (
              <Link className="hover:text-foreground" href="/companies/new">
                Register company
              </Link>
            ) : (
              <Link className="hover:text-foreground" href="/companies">
                Companies
              </Link>
            )}
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
            <ExitIcon className="mr-2 ms-auto h-4 w-4 text-foreground" />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function ProfileDropDown({
  children,
  logOut,
}: {
  children: React.ReactNode;
  logOut: () => void;
}) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 w-48" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => push("/profile")}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => push("/dashboard/company")}>
          Company Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="ms-auto mt-5 flex w-min items-center justify-end text-nowrap">
          <form action={logOut}>
            <button
              className="text-sm"
              type="submit"
              onClick={() => {
                localStorage.removeItem("userToken");
                dispatch(logout());
              }}
            >
              Log out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
