import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Search from "@/components/FormsAndDialog/Search";
import { getAllJobsByCompanySSR } from "@/services/company.service";
import { PauseIcon, PlayIcon, PlusIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { IJob } from "@/types/jobs";

export default async function JobsPage() {
  const token = cookies().get("companyToken")?.value;
  if (!token) return redirect("/dashboard/login");

  const data = await getAllJobsByCompanySSR(token as string);
  const jobs: IJob[] = data?.data[0].jobs;

  return (
    <article className="mx-auto flex h-full w-full max-w-[900px] flex-col gap-3 px-4">
      <div className="sticky top-[5.08rem] z-30 mb-6 flex justify-between bg-background py-3 ps-3 text-xl text-foreground/70">
        <span>Job&apos;s</span>
        <Link href="/dashboard/company/jobs/new">
          <PrimaryButton
            className="w-min gap-1 text-nowrap px-4"
            icon={<PlusIcon />}
          >
            New Job
          </PrimaryButton>
        </Link>
      </div>
      <Search className="shadow-0 w-full max-w-[700px] border" />
      <div className="flex flex-col gap-3 pt-5">
        {jobs?.map((job) => {
          const href = `/dashboard/company/jobs/${job?.id}`;
          return <SingleJob key={job?.id} job={{ ...job, href }} />;
        })}
        {!jobs?.length && (
          <span className="block text-center font-semibold text-muted-foreground">
            No job&apos;s have been posted yet.!
          </span>
        )}
      </div>
    </article>
  );
}

export function SingleJob({ job }: { job: IJob }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border px-4 py-2">
      <Link href={job?.href || `/jobs/${job?.id}`} className="flex-1 ">
        <h1 className="pb-1 text-lg font-semibold">{job?.title}</h1>
        <p className="text-sm text-foreground/70">{job?.type}</p>
        <p className="text-sm text-foreground/70">{job?.location}</p>
        <p className="text-sm text-foreground/70">{job?.officeLocation}</p>
        <div className="mt-1 flex gap-2">
          <span className="rounded-full bg-green-300/30 px-2 pb-[2px] text-center text-xs text-green-500">
            {job?.applicants?.length ?? 0} applicant&apos;s
          </span>
          <span className="rounded-full bg-orange-400/30 px-2 pb-[2px] text-center text-xs text-yellow-500">
            {job?.workSpace}
          </span>
          <span className="rounded-full bg-red-400/30 px-2 pb-[2px] text-center text-xs text-red-500">
            {job?.openings} openings
          </span>
        </div>
      </Link>
      <div className="flex h-full flex-col gap-1">
        <div className="flex gap-2 ">
          <div className="flex h-full max-w-min flex-col items-start px-1">
            <span className="mt-[-6px] block text-nowrap  text-foreground/70">
              {job?.pay?.rate}
            </span>
            <span className="m-0 block text-nowrap p-0">
              ₹ {job?.pay?.minimum && formatMoney(job?.pay?.minimum)} -{" "}
              {formatMoney(job?.pay?.maximum)}
            </span>
          </div>
          <div className="flex w-14 flex-col items-center gap-2">
            {job.status === "open" ? (
              <span className="w-full rounded-full bg-green-200/60 px-2 pb-[2px] text-center text-sm text-green-400 dark:bg-green-200/30">
                {job?.status}
              </span>
            ) : (
              <span className="w-full rounded-full bg-red-200/60 px-2 pb-[2px] text-center text-sm text-red-400 dark:bg-red-200/30">
                {job?.status}
              </span>
            )}
            {job.isPaused ? (
              <span className="flex w-full items-center justify-center rounded-full bg-red-200/60  px-2 py-1  text-sm text-red-400 dark:bg-red-200/30">
                <PlayIcon />
              </span>
            ) : (
              <span className="flex w-full items-center justify-center rounded-full bg-green-200/60 px-2 py-1 text-sm text-green-400 dark:bg-green-200/30">
                <PauseIcon />
              </span>
            )}
          </div>
        </div>
        <p className="mt-auto text-end text-sm text-foreground/70">
          {formatDistanceToNow(job?.createdAt || Date.now()) || "1 day ago"}
        </p>
      </div>
    </div>
  );
}
