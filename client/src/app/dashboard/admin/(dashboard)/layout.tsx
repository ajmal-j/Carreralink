// import CompanyHeader from "@/components/Layout/CompanyHeader";
import AdminHeader from "@/components/Layout/AdminHeader";
import DashboardSideBar from "@/components/Layout/DashboardSideBar";
import {
  BackpackIcon,
  Component1Icon,
  ComponentInstanceIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const logOut = async () => {
  "use server";
  cookies().delete("adminToken");
  redirect("/dashboard/admin/login");
};

export default function layout({ children }: { children: ReactNode }) {
  const kookie = cookies().get("adminToken")?.value;
  return (
    <>
      {kookie ? (
        <div className="h-full min-h-screen">
          <AdminHeader logOut={logOut} />
          <div className="flex min-h-svh divide-x-2 divide-foreground/10 lg:px-10">
            <DashboardSideBar
              items={[
                {
                  title: "Dashboard",
                  icon: <ComponentInstanceIcon className="size-[17px]" />,
                  href: "/dashboard/admin",
                },
                {
                  title: "Users",
                  icon: <PersonIcon className="size-[17px]" />,
                  href: "/dashboard/admin/users",
                },
                {
                  title: "Job's",
                  icon: <BackpackIcon className="size-[17px]" />,
                  href: "/dashboard/admin/jobs",
                },
                {
                  title: "Companies's",
                  icon: <Component1Icon className="size-[17px]" />,
                  href: "/dashboard/admin/companies",
                },
              ]}
              logOut={logOut}
            />
            <div className="w-full  px-4 pt-5">{children}</div>
          </div>
        </div>
      ) : (
        redirect("/dashboard/admin/login")
      )}
    </>
  );
}
