import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Search from "@/components/FormsAndDialog/Search";
import {
  BackpackIcon,
  MixerHorizontalIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { IJob } from "@/types/jobs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import JobFilterSideBar from "@/components/Layout/JobFilterSideBar";
import NotFound from "@/components/Custom/NotFound";
import { JobFilterValues } from "@/app/(user)/jobs/page";
import { Button } from "@/components/ui/button";
import { PaginationComponent } from "@/components/Custom/Pagination";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { getJobs } from "@/services/recruiter.service";
import { SingleJob } from "@/components/Custom/SingleJob";

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

export default async function JobsPage({
  searchParams: { q, type, location, p = 1, sort },
}: PageProps) {
  const token = cookies().get("userToken")?.value;
  if (!token) return redirect("/login");
  const defaultValues: JobFilterValues = { q, location, type, p, sort };
  let jobs = [] as IJob[];
  let options: any = {};
  try {
    const response = await getJobs({
      token,
      query: defaultValues,
    });
    jobs = response?.data?.docs;
    const {
      totalDocs,
      totalPages,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    } = response.data;
    options = {
      totalDocs,
      page,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    };
  } catch (error) {
    console.log(error);
    return <NotFound />;
  }

  return (
    <DashboardWrapper
      title="Job's"
      components={
        <Link href="/dashboard/recruiter/jobs/new">
          <PrimaryButton
            className="w-min gap-1 text-nowrap px-4"
            icon={<PlusIcon />}
          >
            New Job
          </PrimaryButton>
        </Link>
      }
    >
      <Search defaultValue={defaultValues?.q} />
      <div className="mt-7 flex flex-col gap-3 lg:flex-row">
        <div className="flex min-w-full justify-between lg:block lg:min-w-[260px]">
          <div className="sticky top-36 hidden lg:block">
            <h1 className="flex text-xl font-semibold text-foreground/80">
              Filter
            </h1>
            <JobFilterSideBar
              path="/dashboard/recruiter/jobs"
              defaultValues={defaultValues}
              className="me-3"
            />
            <div className="me-3 mt-2 flex">
              <form action={clear} className="w-full">
                <input
                  type="hidden"
                  name="path"
                  value="/dashboard/recruiter/jobs"
                />
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
                <JobFilterSideBar
                  path="/dashboard/recruiter/jobs"
                  defaultValues={defaultValues}
                />
                <div className="flex">
                  <form action={clear} className="w-full">
                    <input
                      type="hidden"
                      name="path"
                      value="/dashboard/recruiter/jobs"
                    />
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
            <SingleJob
              path="/dashboard/recruiter"
              jobAction={<JobAction job={job} />}
              key={job.id}
              job={job}
            />
          ))}
          {!jobs.length && (
            <span className="mt-10 flex items-center justify-center gap-2 text-2xl text-foreground/70">
              <span className="pb-1">Uh! No jobs found.</span>
              <BackpackIcon className="size-5" />
            </span>
          )}
        </div>
      </div>
      <PaginationComponent
        defaultValues={defaultValues}
        options={{ ...options, p }}
        path="/dashboard/recruiter/jobs"
      />
    </DashboardWrapper>
  );
}

function JobAction({ job }: { job: IJob }) {
  return (
    <div className="flex flex-col items-center justify-end gap-2">
      {job.status === "open" ? (
        <span className="w-full rounded-full bg-green-200/60 px-2 pb-[2px] text-center text-sm text-green-400 dark:bg-green-200/30">
          {job?.status}
        </span>
      ) : (
        <span className="w-full rounded-full bg-red-200/60 px-2 pb-[2px] text-center text-sm text-red-400 dark:bg-red-200/30">
          {job?.status}
        </span>
      )}
    </div>
  );
}
