import BackButton from "@/components/Buttons/BackButton";
import NotFound from "@/components/Custom/NotFound";
import EditJobDialogue from "@/components/FormsAndDialog/EditJob";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { JobDetails } from "@/components/ui/job";
import { getJob } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { markdownToDraft } from "markdown-draft-js";

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

const JobActions = ({ id, job }: { id: string; job: IJob }) => {
  return (
    <div>
      <EditJobDialogue
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
