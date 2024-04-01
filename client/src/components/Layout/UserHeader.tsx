"use client";

import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

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
import { currentUser, getUsers } from "@/services/user.service";
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
import { debounce } from "lodash";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThemeToggler } from "../Buttons/theme-toggler";
import Title from "../Custom/Title";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { companyList } from "@/services/company.service";

export default function UserHeader({ logOut }: { logOut: () => void }) {
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
    <header className="z-10 flex items-center justify-between rounded-full px-6 py-3 sm:border-[0.2px]">
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
        <ThemeToggler />
      </div>
      <SearchComponent />
      <ProfileDropDown logOut={logOut}>
        <Avatar className="ms-3 cursor-pointer">
          <AvatarImage src={user?.profile} className="object-cover" />
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      </ProfileDropDown>
      <div className="ms-3 flex items-center justify-end rounded-full border  px-1.5 py-1.5 md:hidden">
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

const SearchComponent = () => {
  type IUser = {
    username: string;
    profile: string;
    email: string;
    currentStatus: string;
  };

  type ICompany = {
    name: string;
    logo: string;
    email: string;
    id: string;
    headquarters: string;
  };

  const [input, setInput] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const fetchUsers = async () => {
    const response = await getUsers({
      q: input,
    });
    setUsers(response?.data.docs || []);
  };
  const fetchCompanies = async () => {
    const response = await companyList(input);
    setCompanies(response?.data || []);
  };

  useEffect(() => {
    if (!input) {
      setUsers([]);
      setCompanies([]);
      return;
    }
    const debouncedFetch = debounce(() => {
      fetchUsers();
      fetchCompanies();
    }, 500);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [input]);

  return (
    <Dialog>
      <DialogTrigger>
        <MagnifyingGlassIcon className="ms-2 size-4" />
      </DialogTrigger>
      <DialogContent className="min-h-[300px]">
        <Command className="rounded-lg shadow-md">
          <div className="flex items-center">
            <MagnifyingGlassIcon className="size-5" />
            <Input
              className="border-0 border-none px-3 ring-0 placeholder:ps-1 focus:ring-0 focus-visible:ring-0 active:ring-0 dark:bg-transparent"
              value={input}
              onInput={(e: any) => setInput(e.target.value)}
              placeholder="Search users or companies..."
            />
          </div>
          <CommandSeparator />
          <CommandList>
            {!users?.length && !companies?.length && (
              <CommandEmpty className="py-2 text-center text-sm text-foreground/60">
                No results found.
              </CommandEmpty>
            )}
            {!!users.length && (
              <CommandGroup heading="User's">
                {users?.map((user, index) => (
                  <Link key={index} href={`/${user?.username}`}>
                    <CommandItem className="cursor-pointer gap-2 hover:bg-foreground/10">
                      <Avatar className="size-7">
                        <AvatarImage
                          src={user?.profile}
                          className="object-cover"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{user?.username}</span>
                        <span className="text-foreground/50">
                          {user?.currentStatus}
                        </span>
                      </div>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            )}
            {!!companies.length && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Companie's">
                  {companies?.map((company, index) => (
                    <Link key={index} href={`/companies/${company?.id}`}>
                      <CommandItem className="cursor-pointer gap-2 hover:bg-foreground/10">
                        <Avatar className="size-7">
                          <AvatarImage
                            src={company.logo}
                            className="object-cover"
                          />
                          <AvatarFallback>C</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span>{company.name}</span>
                          <span className="text-foreground/50">
                            {company.headquarters}
                          </span>
                        </div>
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
        <DialogFooter className="mt-auto">
          <Title height={30} width={100} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
