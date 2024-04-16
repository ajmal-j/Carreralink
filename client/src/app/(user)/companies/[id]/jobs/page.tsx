import NotFound from "@/components/Custom/NotFound";
import { formatMoney } from "@/lib/utils";
import { allCompanyJobs } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function Jobs({
  params: { id },
}: {
  params: { id: string };
}) {
  let jobs = [];
  try {
    const response = await allCompanyJobs(id as string);
    jobs = response.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="mb-10 space-y-2 px-1 pt-5">
      {jobs?.map((job: IJob) => <SingleJobComponent key={job.id} job={job} />)}
      {!jobs?.length && <NotFound title="No jobs have been posted." />}
    </div>
  );
}

function SingleJobComponent({ job }: { job: IJob }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border px-4 py-2 transition-all duration-200 hover:bg-foreground/5">
      <Link href={job?.href || `/jobs/${job?.id}`} className="flex-1 ">
        <h1 className="pb-1 text-lg font-semibold">{job?.title}</h1>
        <p className="text-sm text-foreground/70">
          Applicant&lsquo;s : {job?.applicants}
        </p>
        <p className="text-sm text-foreground/70">
          Opening&lsquo;s : {job?.openings}
        </p>
        <p className="text-sm text-foreground/70">{job?.type}</p>
        <p className="text-sm text-foreground/70">{job?.workSpace}</p>
      </Link>
      <div className="flex flex-col gap-1">
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
          </div>
        </div>
        <p className="text-end text-sm text-foreground/70">
          {formatDistanceToNow(job?.createdAt || Date.now()) || "1 day ago"}
        </p>
      </div>
    </div>
  );
}
