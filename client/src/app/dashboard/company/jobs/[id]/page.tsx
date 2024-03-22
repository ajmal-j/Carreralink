import BackButton from "@/components/Buttons/BackButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import Markdown from "@/components/Custom/Markdown";
import NotFound from "@/components/Custom/NotFound";
import { formatMoney } from "@/lib/utils";
import { getJob } from "@/services/jobs.service";
import { BookmarkIcon, CheckIcon, ClockIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface JobSinglePageProps {
  params: { id: string };
}

export default async function JobSinglePage({
  params: { id },
}: JobSinglePageProps) {
  let job;
  try {
    const response = await getJob(id);
    job = response.data;

    if (!job) {
      <NotFound title="oh The job you are looking for does not exist" />;
    }
  } catch (error) {
    console.log(error);
    return <NotFound title="oh The job you are looking for does not exist" />;
  }

  return (
    <main className="mx-auto mb-6 flex h-full w-full max-w-[900px] flex-col gap-3 px-4">
      <span className="mb-5 flex items-center justify-start">
        <BackButton />
        <h1 className="pb-1 ps-2 text-xl md:text-3xl">{job.title}</h1>
      </span>
      <div className="mt-6 flex w-full flex-wrap  gap-3">
        <Link href={`/companies/${job.company.id}`} className="w-full sm:w-min">
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
          <h1 className="pb-2 text-xl">{job.company.name}</h1>
          <p className="text-sm capitalize text-foreground/70">{job.type}</p>
          {job.workSpace !== "remote" && job.officeLocation ? (
            <p className="text-sm text-foreground/70">
              {job.workSpace} : {job.officeLocation} .
            </p>
          ) : (
            <p className="text-sm text-foreground/70">{job.workSpace}</p>
          )}
          <p>
            {job.pay.rate} : ₹ {formatMoney(job.pay.minimum)} -{" "}
            {formatMoney(job.pay.maximum)}
          </p>
        </div>
        blslsl
      </div>
      <p className="ms-auto mt-[-10px] flex items-center gap-1 text-sm text-foreground/60">
        <ClockIcon /> 1 day ago
      </p>
      <article>
        <div>
          <ul className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-3 ">
            <span className="text-lg font-semibold text-foreground/90">
              Skills :
            </span>
            {job.skills.map((skill: string, index: number) => (
              <li
                className="flex max-w-[200px] flex-grow cursor-pointer items-center justify-center rounded-full border border-foreground/40 px-4 py-1.5 text-sm capitalize transition-all duration-150 hover:bg-foreground/10 lg:text-base "
                key={index}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <h1 className="mb-4 text-2xl font-semibold">Job Description : </h1>
        <Markdown>{job.description}</Markdown>
      </article>
    </main>
  );
}
