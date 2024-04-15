import BackButton from "@/components/Buttons/BackButton";
import NotFound from "@/components/Custom/NotFound";
import { PaginationComponent } from "@/components/Custom/Pagination";
import EditJobDialogue from "@/components/FormsAndDialog/EditJob";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { JobDetails } from "@/components/ui/job";
import { getApplicants, getJob } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { IResponseData } from "@/types/paginateResponse";
import { markdownToDraft } from "markdown-draft-js";
import { cookies } from "next/headers";
import Applicants from "./page";
import { ReactNode } from "react";

interface JobSinglePageProps {
  params: { id: string };
  children: ReactNode;
}

export default async function JobSinglePage({
  params: { id },
  children,
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
      {children}
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