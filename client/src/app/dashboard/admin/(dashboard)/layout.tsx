import AdminHeader from "@/components/Layout/AdminHeader";
import DashboardSideBar from "@/components/Layout/DashboardSideBar";
import { BackpackIcon, LayersIcon, PersonIcon } from "@radix-ui/react-icons";
import { BarChart2, Building2, Crown } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const logOut = async () => {
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
                  title: "Overview",
                  icon: <BarChart2 className="size-[17px]" />,
                  href: "/dashboard/admin",
                },
                {
                  title: "User's",
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
                  icon: <Building2 className="size-[17px]" />,
                  href: "/dashboard/admin/companies",
                },
                {
                  title: "Skill's & Categorie's",
                  icon: <LayersIcon className="size-[17px]" />,
                  href: "/dashboard/admin/manage",
                },
                {
                  title: "Plan's",
                  icon: <Crown className="size-[17px]" />,
                  href: "/dashboard/admin/plans",
                },
              ]}
              logOut={logOut}
            />
            <div className="w-full px-4 pt-5">{children}</div>
          </div>
        </div>
      ) : (
        redirect("/dashboard/admin/login")
      )}
    </>
  );
}
