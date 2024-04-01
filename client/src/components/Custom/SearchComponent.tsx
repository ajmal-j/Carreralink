"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { companyList } from "@/services/company.service";
import { getUsers } from "@/services/user.service";
import { debounce } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import Title from "../Custom/Title";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function SearchComponent() {
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
        <div className="flex cursor-pointer items-center gap-1 rounded-lg bg-primaryColor px-3 py-1.5">
          <MagnifyingGlassIcon className="size-4" />
          <span className="text-sm text-foreground/90">User...</span>
        </div>
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
}
