import NotFound from "@/components/Custom/NotFound";
import { JobDetails } from "@/components/ui/job";
import { getJob } from "@/services/jobs.service";
import JobActions from "./JobActions";

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
  return <JobDetails jobActions={<JobActions job={job} />} job={job} />;
}

