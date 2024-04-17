import { JobFilterValues } from "@/app/(user)/jobs/page";
import NotFound from "@/components/Custom/NotFound";
import { PaginationComponent } from "@/components/Custom/Pagination";
import Search from "@/components/FormsAndDialog/Search";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { formatMoney, generateSearchParam } from "@/lib/utils";
import { getJobs } from "@/services/recruiter.service";
import { IJob } from "@/types/jobs";
import { formatDistanceToNow } from "date-fns";
import { BackpackIcon, ClockIcon, HandCoins, MapPin } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    q?: string;
    p?: number;
    status?: "open" | "closed";
    job?: string;
  };
}

export default async function Applicants({
  searchParams: { q, p = 1, status, job },
}: PageProps) {
  const token = cookies().get("userToken")?.value;
  if (!token) return redirect("/login");
  const defaultValues: JobFilterValues = { q, p, status, job };
  let jobs = [] as IJob[];
  let options: any = {};
  try {
    const response = await getJobs({
      token,
      query: {
        ...defaultValues,
        applicants: "true",
      },
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
  if (!job && jobs.length) {
    const url = generateSearchParam({
      ...defaultValues,
      job: jobs[0]._id ?? jobs[0].id,
    });
    redirect(`/dashboard/recruiter/applicants?${url}`);
  }
  const getUrl = (job: string) => {
    const url = generateSearchParam({
      ...defaultValues,
      job,
    });
    return `/dashboard/recruiter/applicants?${url}`;
  };
  return (
    <div className="mb-auto max-h-min px-2 pt-10">
      <Search
        className="shadow-md shadow-foreground/10"
        defaultValue={defaultValues?.q}
      />
      <div className="mt-10 w-full space-y-2">
        <span className="ps-1 text-foreground/70">
          Showing {options?.totalDocs ?? 0} jobs
        </span>
        {jobs.map((singleJob: IJob, index: number) => (
          <div
            key={index}
            className={`flex gap-3 rounded-md px-3 py-1 hover:bg-foreground/5 ${singleJob._id === job && "bg-foreground/5"}`}
          >
            <Link
              href={getUrl(singleJob._id ?? singleJob.id)}
              className="flex w-full flex-col"
            >
              <h2 className="mb-1 text-lg">{singleJob.title}</h2>
              <p className="flex items-center gap-1 text-sm capitalize text-foreground/70">
                <BackpackIcon className="size-[16px]" />
                {singleJob.type}
              </p>
              {singleJob.officeLocation && (
                <p className="flex items-center gap-1 text-sm text-foreground/70">
                  <MapPin size={17} className="text-foreground/70" />
                  {singleJob.officeLocation}
                </p>
              )}
              <p className="flex items-center gap-1">
                <HandCoins size={17} className="text-foreground/70" />
                <span>
                  {singleJob.pay.rate} : ₹ {formatMoney(singleJob.pay.minimum)}{" "}
                  - {formatMoney(singleJob.pay.maximum)}
                </span>
              </p>
            </Link>
            <div className="flex flex-col items-end gap-1">
              <div className="my-auto flex gap-1 text-sm">
                <span>{singleJob.applicants}</span>
                <span>applicant&apos;s</span>
              </div>
              <p className="ms-auto flex items-center gap-1 text-sm text-foreground/60">
                <span className="text-nowrap">
                  {formatDistanceToNow(singleJob.createdAt)}
                </span>
                <ClockIcon className="size-[12px]" />
              </p>
            </div>
          </div>
        ))}
        {!jobs.length && (
          <span className="mt-10 flex items-center justify-center gap-2 text-2xl text-foreground/70">
            <span className="pb-1">Uh! No jobs found.</span>
            <BackpackIcon className="size-5" />
          </span>
        )}
      </div>
      <PaginationComponent
        defaultValues={defaultValues}
        options={{ ...options, p }}
        path="/dashboard/recruiter/jobs"
      />
    </div>
  );
}
