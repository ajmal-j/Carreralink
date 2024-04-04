import { formatMoney } from "@/lib/utils";
import { IJob } from "@/types/jobs";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { BackpackIcon } from "@radix-ui/react-icons";
import { Building2, MapPin } from "lucide-react";
export function SingleJob({
  job,
  jobAction,
  path,
}: {
  job: IJob;
  path?: string;
  jobAction?: JSX.Element;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl px-3 py-1.5 transition-all duration-150 ease-in-out hover:bg-foreground/5">
      <Link href={`/companies/${job?.company?._id}`} className="mb-auto">
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
        href={job?.href || `${path ? path : ""}/jobs/${job?._id}`}
        className="flex-1 "
      >
        <h1 className="text-lg font-semibold">{job?.title}</h1>
        <p className="flex items-center gap-1 text-sm text-foreground/70">
          <Building2 className="text-foreground/70" size={17} />
          {job?.company?.name}
        </p>
        <p className="flex items-center gap-1 text-sm capitalize text-foreground/70">
          <BackpackIcon />
          {job.type}
        </p>
        {job.officeLocation && (
          <p className="flex items-center gap-1 text-sm text-foreground/70">
            <MapPin size={17} className="text-foreground/70" />
            {job.officeLocation}
          </p>
        )}
        <div className="mt-1 flex flex-wrap gap-2">
          <span className="rounded-full bg-green-300/30 px-2 pb-[2px] text-center text-xs text-green-500">
            {job?.applicants ?? 0} applicant
            {job.applicants === 1 ? "" : <>&apos;s</>}
          </span>
          <span className="rounded-full bg-orange-400/30 px-2 pb-[2px] text-center text-xs text-yellow-500">
            {job?.workSpace}
          </span>
          <span className="rounded-full bg-red-400/30 px-2 pb-[2px] text-center text-xs text-red-500">
            {job?.openings} openings
          </span>
        </div>
      </Link>
      <div className="flex h-full max-w-[20%] flex-col items-end">
        <p className="text-end">
          <span className="block text-foreground/70">{job?.pay?.rate}</span>₹{" "}
          {job?.pay?.minimum && formatMoney(job?.pay?.minimum)} -{" "}
          {formatMoney(job?.pay?.maximum)}
        </p>
        {jobAction}
        <p className="mt-auto block text-end text-sm text-foreground/70">
          {formatDistanceToNow(job.createdAt)}
        </p>
      </div>
    </div>
  );
}
