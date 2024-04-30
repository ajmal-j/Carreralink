import PrimaryButton from "@/components/Buttons/PrimaryButton";
import DashboardPills from "@/components/Custom/DashboardPills";
import RefreshPage from "@/components/Custom/RefreshPage";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { formatMoney } from "@/lib/utils";
import { totalCounts } from "@/services/company.service";
import { IJob } from "@/types/jobs";
import { formatDistanceToNow } from "date-fns";
import { BackpackIcon, ClockIcon, HandCoins, MapPin } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import CompanyChart from "./chart";
import CompanyPlans from "./_components/CompanyPlans";

export default async function DashBoard() {
  const token = cookies().get("companyToken")?.value ?? "";
  let counts: Record<string, number> = {};
  let recentJobs: IJob[] = [];
  try {
    const result = await totalCounts({ token });
    ({ counts } = result.data);
    const data = result.data.recentJobs;
    recentJobs = data.docs;
  } catch (error) {
    console.log(error);
    return <RefreshPage />;
  }
  return (
    <DashboardWrapper className="max-w-[1300px]">
      <DashboardPills counts={counts} />
      <CompanyChart />
      <JobsData recentJobs={recentJobs} />
      <CompanyPlans />
    </DashboardWrapper>
  );
}
function JobsData({ recentJobs }: { recentJobs: IJob[] }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="flex-grow rounded-md border py-2">
        <h1 className="mb-3 text-center text-xl font-semibold">
          Recent Job&apos;s
        </h1>
        <div className="flex flex-col gap-2 px-3">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="flex gap-3 rounded-md px-3 py-1 hover:bg-foreground/5"
            >
              <Link
                href={`/dashboard/company/jobs/${job._id}`}
                className="flex w-full flex-col"
              >
                <h2 className="mb-1 text-lg">{job.title}</h2>
                <p className="flex items-center gap-1 text-sm capitalize text-foreground/70">
                  <BackpackIcon className="size-[16px]" />
                  {job.type}
                </p>
                {job.officeLocation && (
                  <p className="flex items-center gap-1 text-sm text-foreground/70">
                    <MapPin size={17} className="text-foreground/70" />
                    {job.officeLocation}
                  </p>
                )}
                <p className="flex items-center gap-1">
                  <HandCoins size={17} className="text-foreground/70" />
                  <span>
                    {job.pay.rate} : ₹ {formatMoney(job.pay.minimum)} -{" "}
                    {formatMoney(job.pay.maximum)}
                  </span>
                </p>
              </Link>
              <div className="flex flex-col items-end gap-1">
                <div className="my-auto flex gap-1 text-sm">
                  <span>{job.applicants}</span>
                  <span>applicant&apos;s</span>
                </div>
                <p className="ms-auto flex items-center gap-1 text-sm text-foreground/60">
                  <span className="text-nowrap">
                    {formatDistanceToNow(job.createdAt)}
                  </span>
                  <ClockIcon className="size-[12px]" />
                </p>
              </div>
            </div>
          ))}
          <div>
            <PrimaryButton
              className="ms-auto w-min text-nowrap px-3 py-1"
              href="/dashboard/company/jobs"
            >
              View all
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="flex-grow rounded-md border py-2">
        <h1 className="mb-3 text-center text-xl font-semibold">
          Recent Job&apos;s
        </h1>
        <div className="flex flex-col gap-2 px-3">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="flex gap-3 rounded-md px-3 py-1 hover:bg-foreground/5"
            >
              <Link
                href={`/dashboard/company/jobs/${job._id}`}
                className="flex w-full flex-col"
              >
                <h2 className="mb-1 text-lg">{job.title}</h2>
                <p className="flex items-center gap-1 text-sm capitalize text-foreground/70">
                  <BackpackIcon className="size-[16px]" />
                  {job.type}
                </p>
                {job.officeLocation && (
                  <p className="flex items-center gap-1 text-sm text-foreground/70">
                    <MapPin size={17} className="text-foreground/70" />
                    {job.officeLocation}
                  </p>
                )}
                <p className="flex items-center gap-1">
                  <HandCoins size={17} className="text-foreground/70" />
                  <span>
                    {job.pay.rate} : ₹ {formatMoney(job.pay.minimum)} -{" "}
                    {formatMoney(job.pay.maximum)}
                  </span>
                </p>
              </Link>
              <div className="flex flex-col items-end gap-1">
                <div className="my-auto flex gap-1 text-sm">
                  <span>{job.applicants}</span>
                  <span>applicant&apos;s</span>
                </div>
                <p className="ms-auto flex items-center gap-1 text-sm text-foreground/60">
                  <span className="text-nowrap">
                    {formatDistanceToNow(job.createdAt)}
                  </span>
                  <ClockIcon className="size-[12px]" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
