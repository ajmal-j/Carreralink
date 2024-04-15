import Markdown from "@/components/Custom/Markdown";
import { formatMoney } from "@/lib/utils";
import { IJob } from "@/types/jobs";
import { BackpackIcon, ClockIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { HandCoins, ListChecks, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function JobDetails({
  job,
  jobActions,
}: {
  job: IJob;
  jobActions: JSX.Element;
}) {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="mt-6 ps-2 text-center text-xl font-semibold md:text-3xl">
        {job.title}
      </h1>
      <div className="mt-6 flex w-full flex-wrap  gap-3">
        <Link
          href={`/companies/${job.company.id ?? job.company._id}`}
          className="w-full sm:w-min"
        >
          <div className="my-auto flex size-[70px] justify-center gap-3 rounded-full border border-background/10 bg-white shadow-xl md:size-[90px] ">
            <Image
              className="rounded-full object-contain object-center"
              src={job.company.logo}
              alt="Company logo"
              width={100}
              height={100}
            />
          </div>
        </Link>
        <div className="flex-1">
          <h1 className="pb-2 text-2xl font-semibold">{job.company.name}</h1>
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
          <p className="flex items-center gap-1">
            <HandCoins size={17} className="text-foreground/70" />
            <span>
              {job.pay.rate} : ₹ {formatMoney(job.pay.minimum)} -{" "}
              {formatMoney(job.pay.maximum)}
            </span>
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            <span className="rounded-full bg-green-300/30 px-2 pb-[2px] text-center text-xs text-green-500">
              {job?.applicants ?? 0} applicant&apos;s
            </span>
            <span className="rounded-full bg-orange-400/30 px-2 pb-[2px] text-center text-xs text-yellow-500">
              {job?.workSpace}
            </span>
            <span className="rounded-full bg-red-400/30 px-2 pb-[2px] text-center text-xs text-red-500">
              {job?.openings} openings
            </span>
          </div>
        </div>
        {jobActions}
      </div>
      <p className="ms-auto mt-[-10px] flex items-center gap-1 text-sm text-foreground/60">
        <ClockIcon />{" "}
        <span className="text-nowrap">
          {formatDistanceToNow(job.createdAt)}
        </span>
      </p>
      <article>
        <div className="flex">
          <span className="flex items-start text-nowrap text-lg font-semibold text-foreground/70">
            <span className="flex items-center gap-1">
              <ListChecks size={20} />
              <span>Skills :</span>
            </span>
          </span>
          <ul className="mb-3 flex flex-wrap items-center">
            {job.skills.map((skill: string, index: number) => (
              <li
                className="flex cursor-pointer items-center gap-[2px] rounded-full px-3 py-1 text-sm capitalize transition-all duration-150 hover:bg-foreground/10 lg:text-base"
                key={index}
              >
                {skill}
                {index !== job.skills.length - 1 && <span>,</span>}
              </li>
            ))}
          </ul>
        </div>
        <h1 className="mb-4 mt-10 text-2xl font-semibold">
          Job Description :{" "}
        </h1>
        <Markdown className="md:px-4">{job.description}</Markdown>
      </article>
    </main>
  );
}
