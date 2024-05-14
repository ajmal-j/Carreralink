"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { currentUser } from "@/services/user.service";
import { useStateSelector } from "@/store";
import { logout, setUser } from "@/store/reducers/user.slice";
import {
  BackpackIcon,
  Component1Icon,
  FileTextIcon,
  InfoCircledIcon,
  PersonIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { googleLogout } from "@react-oauth/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeToggler } from "../Buttons/theme-toggler";
import Title from "../Custom/Title";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "../ui/use-toast";
import SearchComponent from "../Custom/SearchComponent";

export default function UserHeader({
  logOut,
}: {
  logOut: () => Promise<never>;
}) {
  const { user } = useStateSelector((state) => state.user);
  const { push } = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      try {
        const data = await currentUser();
        if (data && data === 401) {
          localStorage.removeItem("userToken");
          toast({
            title: "You have been blocked",
            description: "Please contact support",
            variant: "destructive",
          });
          googleLogout();
          dispatch(logout());
          push("/login");
          return;
        } else dispatch(setUser(data?.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <header
      className={`z-10 flex items-center justify-between gap-1 rounded-full py-3 sm:border-[0.2px] sm:px-3 ${pathname !== "/" ? "border" : "border-transparent"} px-3 md:gap-2`}
    >
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
        <Link className="hover:text-foreground" href="/dashboard/recruiter">
          Hire
        </Link>
        <Link className="hover:text-foreground" href="/about">
          About
        </Link>
      </div>
      <div className="flex flex-1 justify-end md:flex-none ">
        <div className="hidden md:block">
          <ThemeToggler />
        </div>
      </div>
      <SearchComponent />
      <ProfileDropDown logOut={logOut}>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profile} className="object-cover" />
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      </ProfileDropDown>
      <div className="flex items-center justify-end rounded-full border  px-1.5 py-1.5 md:hidden">
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
        <TextAlignRightIcon className="size-6" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Hi there</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 pb-5 pt-10">
          <span className="flex items-center rounded-2xl py-1.5 ps-5 text-foreground/70 transition-all duration-150 hover:bg-foreground/20 hover:text-foreground">
            <BackpackIcon className="mr-4 h-4 w-4 text-foreground" />
            <Link href="/jobs">Jobs</Link>
          </span>
          <span className="flex items-center rounded-2xl py-1.5 ps-5 text-foreground/70 transition-all duration-150 hover:bg-foreground/20 hover:text-foreground">
            <Component1Icon className="mr-4 h-4 w-4 text-foreground" />
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
            <FileTextIcon className="mr-4 h-4 w-4 text-foreground" />
            <Link href="/dashboard/recruiter">Hire</Link>
          </span>
          <span className="flex items-center rounded-2xl py-1.5 ps-5 text-foreground/70 transition-all duration-150 hover:bg-foreground/20 hover:text-foreground">
            <InfoCircledIcon className="mr-4 h-4 w-4 text-foreground" />
            <Link href="/about">About</Link>
          </span>
          <div className="flex justify-end">
            <ThemeToggler />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ProfileDropDown({
  children,
  logOut,
}: {
  children: React.ReactNode;
  logOut: () => Promise<never>;
}) {
  const { push } = useRouter();
  const { isAuth, user } = useStateSelector((state) => state.user);
  const dispatch = useDispatch();

  const paths: { path: string; name: string }[] = [
    {
      path: "/profile",
      name: "Profile",
    },
    {
      path: "/my-jobs",
      name: "My Jobs",
    },
    {
      path: "/messages",
      name: "Messages",
    },
    {
      path: "/plans",
      name: "My Plans",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 w-48" align="end">
        <DropdownMenuLabel className="font-semibold capitalize text-foreground/70">
          {user?.username ? user?.username : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {paths.map((path) => (
            <DropdownMenuItem
              key={path.path}
              onClick={() => push(`${isAuth ? path.path : "/login"}`)}
            >
              {path.name}
            </DropdownMenuItem>
          ))}
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
            <>
              <button
                className="rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-500"
                type="submit"
                onClick={async () => {
                  await logOut();
                  localStorage.removeItem("userToken");
                  googleLogout();
                  dispatch(logout());
                }}
              >
                Log out
              </button>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
