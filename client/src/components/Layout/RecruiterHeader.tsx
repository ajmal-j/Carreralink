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
import { AvatarIcon } from "@radix-ui/react-icons";
import Title from "../Custom/Title";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggler } from "../Buttons/theme-toggler";
import { useStateSelector } from "@/store";
import { useEffect } from "react";
import { Breadcrumbs } from "./BreadCrums";
import {
  IRecruiter,
  setRecruiter,
  logout,
} from "@/store/reducers/recruiter.slice";
import { setCompany } from "@/store/reducers/company.slice";
import { getCompany } from "@/services/company.service";

export default function RecruiterHeader({
  logOut,
  data,
}: {
  logOut: () => void;
  data: IRecruiter;
}) {
  const { recruiter } = useStateSelector((state) => state.recruiter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRecruiter(data));
    (async () => {
      try {
        const response = await getCompany(data?.id);
        dispatch(setCompany(response.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data]);
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background px-2 py-5 md:px-10 ">
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
        <Title className="me-auto text-xl font-semibold md:me-0" />
        <Breadcrumbs className="ps-2 md:border-s" />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggler />
        <ProfileDropDown logOut={logOut} recruiter={recruiter as IRecruiter}>
          <Avatar className="cursor-pointer border">
            <AvatarImage
              src={recruiter?.logo}
              alt="logo"
              className="object-cover"
            />
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
  recruiter,
}: {
  children: React.ReactNode;
  logOut: () => void;
  recruiter: IRecruiter;
}) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 w-48" align="end">
        <DropdownMenuLabel className="capitalize">
          {recruiter?.company}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => push("/profile")}>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => push("/dashboard/recruiter")}>
          Recruiter Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="ms-auto mt-5 flex w-min items-center justify-end text-nowrap">
          <form action={logOut}>
            <button
              className="rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-500"
              type="submit"
              onClick={() => {
                localStorage.removeItem("userToken");
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
