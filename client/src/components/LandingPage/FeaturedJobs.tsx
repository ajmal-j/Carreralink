import Image from "next/image";
import PrimaryButton from "../Buttons/PrimaryButton";
import { IResponseData } from "@/types/paginateResponse";
import { getAllJobs } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";

export const revalidate = 0;

export default async function FeaturedJobs() {
  let jobs: IJob[] = [];
  let options: IResponseData = {} as IResponseData;
  try {
    const response = await getAllJobs({
      p: 1,
    });
    jobs = response?.data?.docs?.splice(0, 3);
    const { totalDocs, ...rest } = response.data;
    options = {
      totalDocs,
      ...rest,
    };
  } catch (error) {
    console.log(error);
  }
  if (!jobs.length) return null;
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border bg-background px-2 py-3">
      {jobs.map((job) => (
        <>
          <div className="flex w-full items-center justify-between rounded-lg bg-background px-5 py-2 font-montserrat">
            <div className="flex-1">
              <p className="pb-2 text-lg  text-foreground/90">{job.title}</p>
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
        </>
      ))}
      <div className="me-5 ms-auto mt-5">
        <PrimaryButton href="/jobs" className="px-5">
          View all {options.totalDocs} jobs
        </PrimaryButton>
      </div>
    </div>
  );
}
