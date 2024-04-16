import NotFound from "@/components/Custom/NotFound";
import EditJobDialogue from "@/components/FormsAndDialog/EditJob";
import { JobDetails } from "@/components/ui/job";
import { editJob } from "@/services/admin.service";
import { getJob } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { markdownToDraft } from "markdown-draft-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
  let job = {} as IJob;
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
  return <JobDetails job={job} jobActions={<JobActions job={job} id={id} />} />;
}

const JobActions = ({ job, id }: { job: IJob; id: string }) => {
  return (
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
          skills: job.skills,
          pay: job.pay,
          description: markdownToDraft(job.description),
        }}
        id={id}
      />
    </div>
  );
};
