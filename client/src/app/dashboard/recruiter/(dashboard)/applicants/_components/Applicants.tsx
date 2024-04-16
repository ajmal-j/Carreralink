"use client";

import NotFound from "@/components/Custom/NotFound";
import { getJob } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ApplicantsComponent } from "./ApplicantsList";
import { JobDataComponent } from "./JobDataComponent";

export default function ApplicantsList() {
  const [jobData, setJobData] = useState<IJob | null>(null);

  const params = useSearchParams();
  const jobId = params?.get("job");
  const fetchData = async () => {
    const response = await getJob(jobId as string);
    return response.data;
  };
  useEffect(() => {
    if (!jobId) return;
    fetchData().then((data) => setJobData(data));
  }, [jobId]);

  if (!jobId) return <NotFound hideBackButton title="No job found" />;
  return (
    <div className="px-3 py-3">
      {jobData && <JobDataComponent jobData={jobData} />}
      <ApplicantsComponent key={jobId} jobId={jobId} />
    </div>
  );
}




