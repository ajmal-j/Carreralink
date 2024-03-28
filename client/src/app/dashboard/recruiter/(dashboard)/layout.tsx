import CompanyHeader from "@/components/Layout/CompanyHeader";
import DashboardSideBar from "@/components/Layout/DashboardSideBar";
import { BackpackIcon, ComponentInstanceIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const logOut = async () => {
  "use server";
  cookies().delete("userToken");
  redirect("/login");
};

export default async function layout({ children }: { children: ReactNode }) {
  const kookie = cookies().get("userToken")?.value;
  if (!kookie) return redirect("/login");
  let isRecruiter = null;
  return (
    <>
      {isRecruiter ? (
        <div className="h-full min-h-screen">
          <CompanyHeader logOut={logOut} />
          <div className="flex min-h-svh divide-x-2 divide-foreground/10 lg:px-10">
            <DashboardSideBar
              items={[
                {
                  title: "Overview",
                  icon: <ComponentInstanceIcon className="size-[17px]" />,
                  href: "/dashboard/recruiter",
                },
                {
                  title: "Company",
                  icon: <ComponentInstanceIcon className="size-[17px]" />,
                  href: "/dashboard/recruiter/company",
                },
                {
                  title: "Job Listing",
                  icon: <BackpackIcon className="size-[17px]" />,
                  href: "/dashboard/recruiter/jobs",
                },
              ]}
              logOut={logOut}
            />
            <div className="w-full  px-4 pt-5">{children}</div>
          </div>
        </div>
      ) : (
        redirect("/dashboard/recruiter/request")
      )}
    </>
  );
}
