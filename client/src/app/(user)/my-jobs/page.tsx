"use client";

import NotFound from "@/components/Custom/NotFound";
import { PaginationComponent } from "@/components/Custom/Pagination";
import { SingleJob } from "@/components/Custom/SingleJob";
import { toast } from "@/components/ui/use-toast";
import { getSavedJobs, removeSavedJob } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { IResponseData } from "@/types/paginateResponse";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function MyJobs({
  searchParams: { p = 1 },
}: {
  searchParams: {
    p: string | number;
  };
}) {
  const [jobs, setJobs] = useState<{ _id: string; job: IJob }[]>([]);
  const [options, setOptions] = useState<IResponseData>({} as IResponseData);
  const query = { p };
  const fetchJobs = async () => {
    const response = await getSavedJobs();
    const { docs, ...rest } = await response?.data;
    setJobs(docs);
    setOptions(rest);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {!!jobs.length && (
        <>
          <span className="ms-2 text-foreground/70">
            Total {options?.totalDocs || 0}
          </span>
          {jobs.map((job) => (
            <SingleJob
              jobAction={<JobActions job={job.job} setJobs={setJobs} />}
              key={job._id}
              job={job?.job}
            />
          ))}
          <PaginationComponent
            defaultValues={query}
            options={options}
            path="/my-jobs"
          />
        </>
      )}
      {!jobs.length && <NotFound title="No saved jobs." />}
    </div>
  );
}

const JobActions = ({
  setJobs,
  job,
}: {
  job: IJob;
  setJobs: React.Dispatch<React.SetStateAction<{ _id: string; job: IJob }[]>>;
}) => {
  return (
    <div className="flex w-full">
      <button
        onClick={async () => {
          await removeSavedJob(job?._id as string);
          toast({
            title: "Job Removed",
          });
          setJobs((jobs) => jobs.filter((j) => j?.job?._id !== job?._id));
        }}
        className="ms-auto px-2 py-2"
      >
        <BookmarkFilledIcon className="size-4 text-foreground/60 hover:text-foreground" />
      </button>
    </div>
  );
};
