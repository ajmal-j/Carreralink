import DashboardSideBar from "@/components/Layout/DashboardSideBar";
import RecruiterHeader from "@/components/Layout/RecruiterHeader";
import { isRecruiter } from "@/services/recruiter.service";
import { IRecruiter } from "@/store/reducers/recruiter.slice";
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
  let isRec: boolean | IRecruiter;
  try {
    const response = await isRecruiter(kookie);
    isRec = response?.data;
  } catch (error) {
    console.log(error);
    isRec = false;
  }
  return (
    <>
      {isRec ? (
        <div className="h-full min-h-screen">
          <RecruiterHeader logOut={logOut} data={isRec as IRecruiter} />
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
