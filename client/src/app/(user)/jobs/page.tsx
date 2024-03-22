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

interface JobFilterValues {
  q?: string;
  type?: string;
  location?: string;
  p?: number;
}

function getTitle({ q, type, location }: JobFilterValues) {
  const titlePrefix = q ? `${q} jobs` : type ? `${type} jobs` : "All jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

function generateSearchParam({ q, type, location }: JobFilterValues) {
  const searchParams = new URLSearchParams();
  if (q) searchParams.append("q", q);
  if (type) searchParams.append("type", type);
  if (location) searchParams.append("location", location);
  return searchParams.toString();
}

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    p?: number;
  };
}
export default async function JobsList({
  searchParams: { q, location, type, p = 1 },
}: PageProps) {
  const defaultValues: JobFilterValues = { q, location, type, p };

  let jobs;
  let options: any = {};
  try {
    const response = await getAllJobs({
      q,
      location,
      type,
      p,
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
          <JobFilterSideBar
            defaultValues={defaultValues}
            className="me-3 hidden lg:block"
          />
          <div className="inline-block lg:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <MixerHorizontalIcon className="size-5 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <JobFilterSideBar defaultValues={defaultValues} />
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
            <span className="mt-10 flex items-center justify-center gap-2 text-2xl text-foreground/70">
              <span className="pb-1">Uh! No jobs found.</span>
              <BackpackIcon className="size-5" />
            </span>
          )}
        </div>
      </div>
      <JobPagination
        defaultValues={defaultValues}
        options={{ ...options, p }}
      />
    </div>
  );
}

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BackpackIcon,
  EraserIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

export function JobPagination({
  options,
  defaultValues,
}: {
  options: {
    totalDocs: number;
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
  };
  defaultValues: JobFilterValues;
}) {
  const {
    totalDocs,
    page,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = options;
  const searchParams = generateSearchParam(defaultValues);
  return (
    <Pagination className="mt-5">
      <PaginationContent className="ms-auto">
        <PaginationItem>
          <PaginationPrevious
            isActive={hasPrevPage}
            href={
              hasPrevPage
                ? `/jobs?${searchParams && searchParams.concat("&")}p=${prevPage ? prevPage : 1}`
                : "#"
            }
          />
        </PaginationItem>

        {hasPrevPage && (
          <PaginationItem>
            <PaginationLink
              href={`/jobs?${searchParams && searchParams.concat("&")}p=${1}`}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {Number(page) < 2 && hasNextPage && prevPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Number(page) > 2 && prevPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {hasNextPage && (
          <PaginationItem>
            <PaginationLink
              href={`/jobs?${searchParams && searchParams.concat("&")}p=${nextPage ?? page}`}
            >
              {Number(nextPage)}
            </PaginationLink>
          </PaginationItem>
        )}

        {Number(page) - 1 < Number(totalPages) && hasNextPage && !prevPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            isActive={hasNextPage}
            href={
              hasNextPage
                ? `/jobs?${searchParams && searchParams.concat("&")}p=${nextPage ?? page}`
                : "#"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}