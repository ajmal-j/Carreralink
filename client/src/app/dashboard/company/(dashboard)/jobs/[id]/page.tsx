import BackButton from "@/components/Buttons/BackButton";
import NotFound from "@/components/Custom/NotFound";
import EditJobDialogue from "@/components/FormsAndDialog/EditJob";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { JobDetails } from "@/components/ui/job";
import { updateJob } from "@/services/company.service";
import { getJob } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { markdownToDraft } from "markdown-draft-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const editFunction = async (values: Record<string, any>, id: string) => {
  "use server";
  try {
    const token = cookies().get("companyToken")?.value || "";
    await updateJob(id, values, token);
    revalidatePath(`/dashboard/company/jobs/${id}`);
  } catch (error) {
    console.log(error);
  }
};

interface JobSinglePageProps {
  params: { id: string };
}

export default async function JobSinglePage({
  params: { id },
}: JobSinglePageProps) {
  let job: IJob;
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
    <DashboardWrapper>
      <BackButton className="w-min" />
      <JobDetails job={job} jobActions={<JobActions job={job} id={id} />} />
    </DashboardWrapper>
  );
}

const JobActions = ({ job, id }: { job: IJob; id: string }) => {
  return (
    <div>
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
  );
};
