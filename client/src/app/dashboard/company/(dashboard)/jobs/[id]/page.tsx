import BackButton from "@/components/Buttons/BackButton";
import NotFound from "@/components/Custom/NotFound";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { JobDetails } from "@/components/ui/job";
import { getJob } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import JobActions from "../_components/JobActions";


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
