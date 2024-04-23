import Markdown from "@/components/Custom/Markdown";
import { cn, formatMoney } from "@/lib/utils";
import { IJob } from "@/types/jobs";
import { BackpackIcon, ClockIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import {
  Blocks,
  Building,
  Building2,
  HandCoins,
  ListChecks,
  ListChecksIcon,
  MapPin,
  User,
} from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export function JobDetails({
  job,
  jobActions,
}: {
  job: IJob;
  jobActions?: JSX.Element;
}) {
  return (
    <main className="flex flex-col gap-3">
      <h1
        className={cn(
          "mt-6 ps-2 text-center text-xl font-semibold md:text-3xl",
          poppins.className,
        )}
      >
        {job.title}
      </h1>
      <div className="mt-6 flex w-full flex-wrap  gap-3 md:px-8">
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
      <article>
        <div className="flex sm:px-8">
          <span className="flex items-start text-nowrap text-lg font-semibold text-foreground/70">
            <span className="flex items-center gap-1">
              <Blocks size={20} />
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
        <p className="mt-[-10px] flex items-center justify-end gap-1 text-sm text-foreground/60 md:px-8">
          <ClockIcon />{" "}
          <span className="text-nowrap">
            {formatDistanceToNow(job.createdAt)}
          </span>
        </p>
        <h1 className="mb-4 mt-10 text-2xl font-semibold">
          Job Description :{" "}
        </h1>
        <Markdown className="md:px-4">{job.description}</Markdown>
      </article>
      <footer className="mt-10">
        {job.postedBy.by === "recruiter" ? (
          <div className="flex flex-col gap-2 px-4">
            <span className="text-sm text-foreground/70">Posted by :</span>
            <div className="mx-5 flex gap-3 rounded-md bg-foreground/5 p-4">
              <Avatar className="size-14">
                <AvatarImage src={job.postedBy.id.profile} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Link href={`/${job.postedBy.id.username}`} className="text-xl">
                  {" "}
                  {job.postedBy.id.username}{" "}
                  <span className="text-sm text-foreground/70">
                    (recruiter at {job.company.name})
                  </span>
                </Link>
                <span className="text-sm text-foreground/70">
                  {job.postedBy.id.email}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-4">
            <span className="text-sm text-foreground/70">Posted by :</span>
            <div className="mx-5 flex gap-3 rounded-md bg-foreground/5 p-4">
              <Avatar className="size-14">
                <AvatarImage src={job.postedBy.id.logo} />
                <AvatarFallback>
                  <Building2 />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Link
                  href={`/companies/${job.postedBy.id.id}`}
                  className="text-xl"
                >
                  {" "}
                  {job.postedBy.id.name}
                </Link>
                <span className="text-sm text-foreground/70">
                  {job.postedBy.id.email}
                </span>
              </div>
            </div>
          </div>
        )}
      </footer>
    </main>
  );
}
