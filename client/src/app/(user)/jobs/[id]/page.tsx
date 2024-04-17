import NotFound from "@/components/Custom/NotFound";
import { JobDetails } from "@/components/ui/job";
import { getJob } from "@/services/jobs.service";
import JobActions from "./JobActions";
import { IJob } from "@/types/jobs";
import ValidateResume from "../_components/ValidateResume";

interface JobSinglePageProps {
  params: { id: string };
}

export default async function JobSinglePage({
  params: { id },
}: JobSinglePageProps) {
  let job: IJob | null = null;
  try {
    const response = await getJob(id);
    job = response.data;
  } catch (error) {
    console.log(error);
    return <NotFound title="oh The job you are looking for does not exist" />;
  }

  if (!job) {
    return <NotFound title="oh The job you are looking for does not exist" />;
  }
  return (
    <div>
      <JobDetails jobActions={<JobActions job={job} />} job={job} />
      <ValidateResume job={job} />
    </div>
  );
}
