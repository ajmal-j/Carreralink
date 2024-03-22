import { formatMoney } from "@/lib/utils";
import { IJob } from "@/types/jobs";
import Image from "next/image";
import Link from "next/link";

export function SingleJob({ job }: { job: IJob }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border px-3 py-1 hover:bg-foreground/5 transition-all duration-150 ease-in-out">
      <Link
        href={`/companies/${job?.company?.id ?? job?.company?._id}`}
        className="mb-auto"
      >
        <div className="mt-1 flex size-[50px] justify-center gap-3 rounded-full border bg-white md:size-[60px] ">
          <Image
            className="rounded-full object-contain object-center"
            src={job.company.logo}
            alt="Company logo"
            width={100}
            height={100}
          />
        </div>
      </Link>
      <Link
        href={job?.href || `/jobs/${job?.id ?? job?._id}`}
        className="flex-1 "
      >
        <h1 className="text-lg font-semibold">{job?.title}</h1>
        <p className="text-sm text-foreground/70">{job?.company?.name}</p>
        <p className="text-sm text-foreground/70">{job?.type}</p>
        <p className="text-sm text-foreground/70">{job?.location}</p>
        <span className="rounded-full bg-green-300/30 px-2 pb-[2px] text-center text-xs text-green-500">
          {job?.applicants?.length ?? 0} applicant&apos;s
        </span>
      </Link>
      <div className="flex max-w-[20%] flex-grow flex-col justify-between">
        <p className="text-end ">
          <span className="block text-foreground/70">{job?.pay?.rate}</span>₹{" "}
          {job?.pay?.minimum && formatMoney(job?.pay?.minimum)} -{" "}
          {formatMoney(job?.pay?.maximum)}
        </p>
        <p className="text-end text-sm text-foreground/70">1 day ago</p>
      </div>
    </div>
  );
}
