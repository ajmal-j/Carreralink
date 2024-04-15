"use client";

import NotFound from "@/components/Custom/NotFound";
import Separator from "@/components/Custom/Separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusButtonColors } from "@/constants";
import { formatMoney } from "@/lib/utils";
import { getApplicants, getJob } from "@/services/jobs.service";
import { IApplicant, IAvailableStatus, IJob } from "@/types/jobs";
import { IResponseData } from "@/types/paginateResponse";
import { PersonIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ExternalLinkIcon,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

function ApplicantsComponent({ jobId }: { jobId: string }) {
  const [applicants, setApplicants] = useState<IApplicant[]>([]);
  const [loadingMore, setLoadingMore] = useState(true);
  const [options, setOptions] = useState<Omit<IResponseData, "docs">>(
    {} as Omit<IResponseData, "docs">,
  );
  const [query, setQuery] = useState({
    p: 1,
  });

  const fetchApplicants = async () => {
    if (!jobId || query.p < 1) return;
    const response = await getApplicants({ job: jobId as string, query });
    const { docs, ...rest } = response.data as IResponseData;
    setOptions(rest);
    setApplicants(docs);
  };

  useEffect(() => {
    fetchApplicants().then(() => setLoadingMore(false));
  }, [query]);

  return (
    <>
      {applicants.length ? (
        <div className="mt-6">
          <h1 className="mx-3 mb-2 text-xl font-semibold text-foreground/90">
            Applicants :{" "}
          </h1>
          {applicants.map((applicant, index) => (
            <ApplicantCard key={index} applicant={applicant} />
          ))}
          <div className="mt-4 flex justify-end">
            {loadingMore ? (
              <Loader className="animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  disabled={!options?.hasPrevPage}
                  onClick={() =>
                    setQuery((prev) => ({ p: options.prevPage ?? prev.p - 1 }))
                  }
                  variant={"outline"}
                  size={"icon"}
                >
                  <ChevronLeft size={13} />
                </Button>
                <span className="text-sm text-foreground/70">
                  page : {options?.page}
                </span>
                <Button
                  disabled={!options?.hasNextPage}
                  onClick={() =>
                    setQuery((prev) => ({ p: options?.nextPage ?? prev.p + 1 }))
                  }
                  variant={"outline"}
                  size={"icon"}
                >
                  <ChevronRight size={13} />
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NotFound hideBackButton title="No applicant's found" />
      )}
    </>
  );
}

function ApplicantCard({ applicant }: { applicant: IApplicant }) {
  const [status, setStatus] = useState<IAvailableStatus>(
    applicant.status as IAvailableStatus,
  );
  const [availableStatus, setAvailableStatus] = useState<IAvailableStatus[]>(
    [],
  );

  const updateStatus = (status: IAvailableStatus) => {
    if (status === "applied") {
      setAvailableStatus(["applied", "interview", "rejected"]);
    } else if (status === "interview") {
      setAvailableStatus([
        "interview",
        "underReview",
        "shortlisted",
        "rejected",
        "hired",
      ]);
    } else if (status === "shortlisted") {
      setAvailableStatus(["shortlisted", "rejected", "hired"]);
    } else if (status === "rejected") {
      setAvailableStatus(["rejected"]);
    } else if (status === "underReview") {
      setAvailableStatus(["underReview", "hired", "rejected"]);
    } else if (status === "hired") {
      setAvailableStatus(["hired"]);
    }
  };

  useEffect(() => {
    updateStatus(status);
  }, [status]);

  return (
    <div className="flex cursor-pointer gap-3 rounded-xl bg-foreground/5 px-4 py-3 transition-colors duration-200 hover:bg-foreground/10 dark:bg-foreground/[0.02] hover:dark:bg-foreground/5">
      <Avatar className="size-12">
        <AvatarImage src={applicant.user.profile} />
        <AvatarFallback>
          <PersonIcon />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 ">
        <Link
          href={`/dashboard/recruiter/jobs/applicant/${applicant.user.username}`}
          className="font-semibold capitalize hover:underline"
        >
          {applicant.user.username}
        </Link>
        <p className="text-sm text-foreground/70">{applicant.user.email}</p>
        <p className="block text-sm text-foreground/70">
          <span className="pe-1">applied</span>
          {formatDistanceToNow(applicant.createdAt)}
        </p>
      </div>
      <div className="flex h-full flex-col">
        <div className="flex w-full flex-col gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full" asChild>
              <Button
                variant="default"
                size={"sm"}
                className={`flex w-full gap-1 capitalize text-foreground hover:${statusButtonColors[status]}/70 border ${statusButtonColors[status]}`}
              >
                <span>{status}</span>
                <ChevronDownIcon size={13} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Update status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={status}
                onValueChange={(value: string) =>
                  setStatus(value as IAvailableStatus)
                }
              >
                {availableStatus.map((status, index) => (
                  <DropdownMenuRadioItem
                    value={status}
                    key={index}
                    className="cursor-pointer capitalize"
                  >
                    {status}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link className="w-full" target={"_blank"} href={applicant.resume}>
            <Button
              className="flex items-center gap-1"
              size={"sm"}
              variant={"outline"}
            >
              <span className="text-sm">resume</span>
              <ExternalLinkIcon size={13} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function JobDataComponent({ jobData }: { jobData: IJob }) {
  return (
    <div className="mb-10">
      <div className="mb-7 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold lg:text-4xl">
            {jobData.title}
          </h1>
          <span className="text-sm text-foreground/70">
            {jobData.officeLocation
              ? `${jobData.officeLocation}/${jobData.workSpace}`
              : jobData.workSpace}
          </span>
        </div>
        <div>
          <Button variant="outline">action</Button>
        </div>
      </div>
      <h1 className="text-xl font-semibold">Job detail&apos;s</h1>
      <div className="mt-5 flex flex-col gap-2">
        <Separator className="h-[2px] bg-foreground/50" />
        <div className="flex items-center">
          <div className="w-full flex-1">
            <h1 className="text-sm text-foreground/70">Posted</h1>
            <span>{formatDistanceToNow(new Date(jobData.createdAt))}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-sm text-foreground/70">Applicant&apos;s</h1>
            <span>{jobData.applicants}</span>
          </div>
        </div>
        <Separator className="h-[2px] bg-foreground/50" />
        <div className="flex items-center">
          <div className="w-full flex-1">
            <h1 className="text-sm text-foreground/70">Type</h1>
            <span>{jobData.type}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-sm text-foreground/70">Status</h1>
            <span>{jobData.status}</span>
          </div>
        </div>
        <Separator className="h-[2px] bg-foreground/50" />
        <div className="flex items-center">
          <div className="w-full flex-1">
            <h1 className="text-sm text-foreground/70">Pay</h1>
            <span>
              <span className="me-2 text-foreground/70">
                {jobData?.pay?.rate} :
              </span>
              ₹ {jobData?.pay?.minimum && formatMoney(jobData?.pay?.minimum)} -{" "}
              {formatMoney(jobData?.pay?.maximum)}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-sm text-foreground/70">Opening&apos;s</h1>
            <span>{jobData.openings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
