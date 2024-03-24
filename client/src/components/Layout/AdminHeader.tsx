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
import { logout } from "@/store/reducers/company.slice";
import { AvatarIcon } from "@radix-ui/react-icons";
import Title from "../Custom/Title";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggler } from "../Buttons/theme-toggler";
import { useStateSelector } from "@/store";
import { useEffect } from "react";
import { currentAdmin } from "@/services/user.service";
import { setAdmin } from "@/store/reducers/admin.slice";

export default function AdminHeader({ logOut }: { logOut: () => void }) {
  const { admin } = useStateSelector((state) => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const data = await currentAdmin();
        dispatch(setAdmin(data?.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background px-2 py-5 md:px-10 ">
      <Title className=" text-xl font-semibold" />
      <div className="flex items-center gap-3">
        <ThemeToggler />
        <ProfileDropDown logOut={logOut}>
          <Avatar className="cursor-pointer border">
            <AvatarImage
              src={admin?.profile}
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
}: {
  children: React.ReactNode;
  logOut: () => void;
}) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { admin } = useStateSelector((state) => state.admin);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 w-48" align="end">
        <DropdownMenuLabel>{admin?.username || "My Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem onClick={() => push("/profile")}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => push("/dashboard/admin")}>
          Admin Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="ms-auto mt-5 flex w-min items-center justify-end text-nowrap">
          <form action={logOut}>
            <button
              className="text-sm"
              type="submit"
              onClick={() => {
                localStorage.removeItem("adminToken");
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
