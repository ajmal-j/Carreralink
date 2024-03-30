import Markdown from "@/components/Custom/Markdown";
import NotFound from "@/components/Custom/NotFound";
import EditJobDialogue from "@/components/FormsAndDialog/EditJob";
import { formatMoney } from "@/lib/utils";
import { editJob } from "@/services/admin.service";
import { getJob } from "@/services/jobs.service";
import { ClockIcon } from "@radix-ui/react-icons";
import { markdownToDraft } from "markdown-draft-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

interface JobSinglePageProps {
  params: { id: string };
}

async function editFunction(values: Record<string, any>, id: string) {
  "use server";
  const token = cookies().get("adminToken")?.value || "";
  await editJob({
    token,
    id,
    values,
  });
  revalidatePath(`/dashboard/admin/jobs/${id}`);
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
    <main className="flex flex-col gap-3">
      <h1 className="mt-6 ps-2 text-center text-xl md:text-3xl">{job.title}</h1>
      <div className="mt-6 flex w-full flex-wrap  gap-3">
        <Link
          href={`/dashboard/admin/companies/${job.company.id}`}
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
          <h1 className="pb-2 text-xl">{job.company.name}</h1>
          <p className="text-sm capitalize text-foreground/70">
            {job.category}
          </p>
          <p className="text-sm capitalize text-foreground/70">{job.type}</p>
          <p className="text-sm text-foreground/70">{job.location}</p>
          <p className="text-sm text-foreground/70">{job.officeLocation}</p>
          <p>
            {job.pay.rate} : ₹ {formatMoney(job.pay.minimum)} -{" "}
            {formatMoney(job.pay.maximum)}
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
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
        </div>
        <div className="mt-auto flex flex-col gap-3 pb-3">
          <EditJobDialogue
            editFunction={editFunction}
            defaultValues={{
              title: job.title,
              type: job.type,
              category: job.category,
              openings: job.openings,
              workSpace: job.workSpace,
              officeLocation: job.officeLocation,
              location: job.location,
              skills: job.skills,
              pay: job.pay,
              description: markdownToDraft(job.description),
            }}
            id={id}
          />
        </div>
      </div>
      <p className="ms-auto mt-[-10px] flex items-center gap-1 text-sm text-foreground/60">
        <ClockIcon /> 1 day ago
      </p>
      <article>
        <div>
          <ul className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-3 ">
            <span className="text-lg font-semibold text-foreground/90">
              Skills :
            </span>
            {job.skills.map((skill: string, index: number) => (
              <li
                className="flex cursor-pointer items-center rounded-full border border-foreground/20 px-3 py-1 text-sm capitalize transition-all duration-150 hover:bg-foreground/10 lg:text-base "
                key={index}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <h1 className="mb-4 mt-10 text-2xl font-semibold">
          Job Description :{" "}
        </h1>
        <Markdown>{job.description}</Markdown>
      </article>
    </main>
  );
}
