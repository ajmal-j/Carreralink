import { JobFilterValues } from "@/app/(user)/jobs/page";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import NotFound from "@/components/Custom/NotFound";
import { PaginationComponent } from "@/components/Custom/Pagination";
import Search from "@/components/FormsAndDialog/Search";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import JobFilterSideBar from "@/components/Layout/JobFilterSideBar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatMoney } from "@/lib/utils";
import { getJobs } from "@/services/company.service";
import { IJob } from "@/types/jobs";
import {
  BackpackIcon,
  MixerHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    p?: number;
    sort?: string;
    status?: string;
  };
}
async function clear(formData: FormData) {
  "use server";
  const { path } = Object.fromEntries(formData.entries());
  redirect(path as string);
}

export default async function JobsPage({
  searchParams: { q, type, location, p = 1, sort, status },
}: PageProps) {
  const token = cookies().get("companyToken")?.value;
  if (!token) return redirect("/dashboard/login");
  const defaultValues: JobFilterValues = { q, location, type, p, sort, status };
  let jobs;
  let options: any = {};
  try {
    const response = await getJobs(token, {
      q,
      location,
      type,
      p,
      sort,
      status,
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
        <Link href="/dashboard/company/jobs/new">
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
              showClosedJobs
              path="/dashboard/company/jobs"
              defaultValues={defaultValues}
              className="me-3"
            />
            <div className="me-3 mt-2 flex">
              <form action={clear} className="w-full">
                <input
                  type="hidden"
                  name="path"
                  value="/dashboard/company/jobs"
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
                  showClosedJobs
                  path="/dashboard/company/jobs"
                  defaultValues={defaultValues}
                />
                <div className="flex">
                  <form action={clear} className="w-full">
                    <input
                      type="hidden"
                      name="path"
                      value="/dashboard/company/jobs"
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
            <SingleJob key={job.id} job={job} />
          ))}
          {!jobs.length && (
            <span className="mt-10 flex items-center justify-center gap-2 text-foreground/70">
              <span className="pb-1">No jobs found.</span>
              <BackpackIcon className="size-4" />
            </span>
          )}
        </div>
      </div>
      <PaginationComponent
        defaultValues={defaultValues}
        options={{ ...options, p }}
        path="/dashboard/company/jobs"
      />
    </DashboardWrapper>
  );
}

function SingleJob({ job }: { job: IJob }) {
  return (
    <div className="flex flex-col items-center gap-x-3 gap-y-5 rounded-sm px-4 py-2 transition-all duration-200 hover:bg-foreground/5 sm:flex-row">
      <Link
        href={job?.href || `/dashboard/company/jobs/${job?.id ?? job?._id}`}
        className="flex-1 place-self-start"
      >
        <h1 className="pb-1 text-lg font-semibold">{job?.title}</h1>
        <p className="text-sm text-foreground/70">{job?.type}</p>
        <p className="text-sm text-foreground/70">{job?.workSpace}</p>
        <p className="text-sm text-foreground/70">{job?.officeLocation}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <span className="rounded-full bg-green-300/30 px-2 pb-[2px] text-center text-xs text-green-500">
            {job?.applicants ?? 0} applicant&apos;s
          </span>
          <span className="rounded-full bg-orange-400/30 px-2 pb-[2px] text-center text-xs text-yellow-500">
            {job?.workSpace}
          </span>
          <span className="rounded-full bg-red-400/30 px-2 pb-[2px] text-center text-xs text-red-500">
            {job?.openings} openings
          </span>
        </div>
      </Link>
      <div className="mb-auto flex h-full flex-col gap-1 place-self-end">
        <div className="flex flex-wrap justify-end gap-2">
          <div className="flex h-full max-w-min flex-col items-start px-1">
            <span className="mt-[-6px] block text-nowrap  text-foreground/70">
              {job?.pay?.rate}
            </span>
            <span className="m-0 block text-nowrap p-0">
              ₹ {job?.pay?.minimum && formatMoney(job?.pay?.minimum)} -{" "}
              {formatMoney(job?.pay?.maximum)}
            </span>
          </div>
          <div className="flex w-14 flex-col items-center gap-2">
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
        </div>
        <p className="mt-auto text-wrap text-end text-sm text-foreground/70">
          {formatDistanceToNow(job?.createdAt || Date.now()) || "1 day ago"}
        </p>
      </div>
    </div>
  );
}
