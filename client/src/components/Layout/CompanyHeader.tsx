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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout, setCompany } from "@/store/reducers/company.slice";
import { AvatarIcon } from "@radix-ui/react-icons";
import Title from "../Custom/Title";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggler } from "../Buttons/theme-toggler";
import { useStateSelector } from "@/store";
import { useEffect } from "react";
import { getCompanyData } from "@/services/company.service";
import { Breadcrumbs } from "./BreadCrums";

export default function CompanyHeader({ logOut }: { logOut: () => void }) {
  const { logo } = useStateSelector((state) => state.company);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await getCompanyData();
        dispatch(setCompany(response.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background px-2 py-5 md:px-10 ">
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
        <Title className="me-auto text-xl font-semibold md:me-0" />
        <Breadcrumbs className="ps-2 md:border-s" />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggler />
        <ProfileDropDown logOut={logOut}>
          <Avatar className="cursor-pointer border">
            <AvatarImage src={logo} alt="logo" className="object-cover" />
            <AvatarFallback>
              <AvatarIcon className="size-6 text-foreground/50" />
            </AvatarFallback>
          </Avatar>
        </ProfileDropDown>
      </div>
    </div>
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
  const dispatch = useDispatch();
  const { name } = useStateSelector((state) => state.company);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 w-48" align="end">
        <DropdownMenuLabel>{name || "My Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuItem onClick={() => push("/dashboard/company")}>
          Company Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="ms-auto mt-5 flex w-min items-center justify-end text-nowrap">
          <form action={logOut}>
            <button
              className="rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-500"
              type="submit"
              onClick={() => {
                localStorage.removeItem("companyToken");
                setTimeout(() => {
                  dispatch(logout());
                }, 3000);
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
