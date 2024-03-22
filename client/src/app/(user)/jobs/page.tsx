import Search from "@/components/FormsAndDialog/Search";
import JobFilterSideBar from "@/components/Layout/JobFilterSideBar";
import { SingleJob } from "@/components/Custom/SingleJob";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllJobs } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import NotFound from "@/components/Custom/NotFound";
import { BackpackIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { JobPagination } from "@/components/Custom/Paginations";
import { IResponseData } from "@/types/paginateResponse";

export interface JobFilterValues {
  q?: string;
  type?: string;
  location?: string;
  p?: number;
  sort?: string;
}

function getTitle({ q, type, location }: JobFilterValues) {
  const titlePrefix = q ? `${q} jobs` : type ? `${type} jobs` : "All jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    p?: number;
    sort?: string;
  };
}

async function clear(formData: FormData) {
  "use server";
  const { path } = Object.fromEntries(formData.entries());
  redirect(path as string);
}

export default async function JobsList({
  searchParams: { q, location, type, p = 1, sort },
}: PageProps) {
  const defaultValues: JobFilterValues = { q, location, type, p, sort };

  let jobs;
  let options: IResponseData = {} as IResponseData;
  try {
    const response = await getAllJobs({
      q,
      location,
      type,
      p,
      sort,
    });
    jobs = response?.data?.docs;
    const { totalDocs, ...rest } = response.data;
    options = {
      totalDocs,
      ...rest,
    };
  } catch (error) {
    console.log(error);
    return <NotFound />;
  }
  return (
    <div>
      <h1 className="mt-6 text-center text-4xl capitalize">
        {getTitle(defaultValues)}
      </h1>
      <Search
        defaultValue={defaultValues?.q}
        action="/jobs"
        className="mt-10 max-w-[600px]"
      />
      <div className="mt-7 flex flex-col gap-3 lg:flex-row">
        <div className="flex min-w-full justify-between lg:block lg:min-w-[260px]">
          <h1 className="flex text-xl font-semibold text-foreground/80">
            Filter
          </h1>
          <div className="hidden lg:block">
            <JobFilterSideBar
              path="/jobs"
              defaultValues={defaultValues}
              className="me-3"
            />
            <div className="me-3 mt-2 flex justify-start">
              <form action={clear} className="w-full">
                <input type="hidden" name="path" value="/jobs" />
                <Button type="submit" variant="outline" className="w-full">
                  clear
                </Button>
              </form>
            </div>
          </div>
          <div className="inline-block lg:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <MixerHorizontalIcon className="size-5 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filter</DialogTitle>
                </DialogHeader>
                <JobFilterSideBar path="/jobs" defaultValues={defaultValues} />
                <div className="mt-2 flex">
                  <form action={clear} className="w-full">
                    <input type="hidden" name="path" value="/jobs" />
                    <Button type="submit" variant="outline" className="w-full">
                      clear
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-10 w-full space-y-2">
          <span className="ps-1 text-foreground/70">
            Showing {options?.totalDocs ?? 0} jobs
          </span>
          {jobs.map((job: IJob) => (
            <SingleJob key={job.id} job={job} />
          ))}
          {!jobs.length && (
            <span className="flex items-center justify-center gap-2 pb-36 pt-10 text-2xl text-foreground/70">
              <span className="pb-1">Uh! No jobs found.</span>
              <BackpackIcon className="size-5" />
            </span>
          )}
        </div>
      </div>
      <JobPagination
        defaultValues={defaultValues}
        options={{ ...options }}
        path="/jobs"
      />
    </div>
  );
}
