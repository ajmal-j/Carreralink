import CompanyHeader from "@/components/Layout/CompanyHeader";
import DashboardSideBar from "@/components/Layout/DashboardSideBar";
import {
  BackpackIcon,
  ComponentInstanceIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { BarChart2, Building2 } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const logOut = async () => {
  "use server";
  cookies().delete("companyToken");
  redirect("/dashboard/company/login");
};

export default function layout({ children }: { children: ReactNode }) {
  const kookie = cookies().get("companyToken")?.value;
  return (
    <>
      {kookie ? (
        <div className="h-full min-h-screen">
          <CompanyHeader logOut={logOut} />
          <div className="flex min-h-svh divide-x-2 divide-foreground/10 lg:px-10">
            <DashboardSideBar
              items={[
                {
                  title: "Overview",
                  icon: <BarChart2 className="size-[17px]" />,
                  href: "/dashboard/company",
                },
                {
                  title: "Company",
                  icon: <Building2 className="size-[17px]" />,
                  href: "/dashboard/company/profile",
                },
                {
                  title: "Job Listing",
                  icon: <BackpackIcon className="size-[17px]" />,
                  href: "/dashboard/company/jobs",
                },
                {
                  title: "Recruiter's",
                  icon: <PersonIcon className="size-[17px]" />,
                  href: "/dashboard/company/recruiter",
                },
              ]}
              logOut={logOut}
            />
            <div className="w-full px-4 pt-5">{children}</div>
          </div>
        </div>
      ) : (
        redirect("/dashboard/company/login")
      )}
    </>
  );
}
