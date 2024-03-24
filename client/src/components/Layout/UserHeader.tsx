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
import Link from "next/link";
import {
  BackpackIcon,
  Component1Icon,
  ExitIcon,
  FileTextIcon,
  InfoCircledIcon,
  PersonIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { currentUser } from "@/services/user.service";
import { useStateSelector } from "@/store";
import { useDispatch } from "react-redux";
import { logout, setUser } from "@/store/reducers/user.slice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { googleLogout } from "@react-oauth/google";

export default function UserHeader({ logOut }: { logOut: () => void }) {
  const { isAuth, user } = useStateSelector((state) => state.user);

  const dispatch = useDispatch();
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
  }, []);

  return (
    <header className="z-10 flex items-center justify-between rounded-full border-[0.2px] bg-background px-6 py-3">
      <Title />
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
      <div className="flex flex-1 justify-end md:flex-none ">
        <ThemeToggler />
      </div>
      <ProfileDropDown logOut={logOut}>
        <Avatar className="ms-3 cursor-pointer">
          <AvatarImage src={user?.profile} className="object-cover" />
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      </ProfileDropDown>
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
import Title from "../Custom/Title";

export function ProfileDropDown({
  children,
  logOut,
}: {
  children: React.ReactNode;
  logOut: () => void;
}) {
  const { push } = useRouter();
  const { isAuth, user } = useStateSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 w-48" align="end">
        <DropdownMenuLabel className="font-semibold capitalize text-foreground/70">
          {user?.username ? user?.username : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => push(`${isAuth ? "/profile" : "/login"}`)}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => push("/dashboard/company")}>
          Company Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="ms-auto mt-5 flex w-min items-center justify-end text-nowrap">
          {!isAuth ? (
            <Link
              href={"/login"}
              className="rounded-full bg-primaryColor px-3 py-1 text-sm"
              type="submit"
            >
              Log In
            </Link>
          ) : (
            <form action={logOut}>
              <button
                className="rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-500"
                type="submit"
                onClick={() => {
                  localStorage.removeItem("userToken");
                  googleLogout();
                  dispatch(logout());
                }}
              >
                Log out
              </button>
            </form>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
