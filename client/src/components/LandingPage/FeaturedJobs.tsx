"use client";

import { getAllJobs } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { IResponseData } from "@/types/paginateResponse";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import { JobSkeleton } from "../Layout/JobsSkeleton";

export const revalidate = 0;

export default function FeaturedJobs() {
  const [options, setOptions] = useState<IResponseData>({} as IResponseData);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs({
        p: 1,
      });
      const job = response?.data?.docs?.splice(0, 3);
      const { totalDocs, ...rest } = response.data;
      const option = {
        totalDocs,
        ...rest,
      };
      setOptions(option);
      setJobs(job);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (!jobs.length) return null;
  return (
    <>
      {!loading ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border bg-background px-2 py-3">
          {jobs?.map((job) => (
            <Link href={`/jobs/${job._id}`} key={job._id} className="w-full">
              <div className="flex w-full items-center justify-between rounded-lg bg-background px-5 py-2 font-montserrat">
                <div className="flex-1">
                  <p className="pb-2 text-lg  text-foreground/90">
                    {job.title}
                  </p>
                  <p className="text-foreground/60">{job.company.name}</p>
                  <p className="text-foreground/60">{job.workSpace}</p>
                </div>
                <div className="flex h-[100px] items-center overflow-hidden rounded-xl bg-white">
                  <Image
                    alt="logo"
                    className="rounded-lg"
                    src={job.company.logo}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </Link>
          ))}
          <div className="me-5 ms-auto mt-5">
            <PrimaryButton href="/jobs" className="px-5">
              View all {options?.totalDocs} jobs
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <JobSkeleton />
      )}
    </>
  );
}
