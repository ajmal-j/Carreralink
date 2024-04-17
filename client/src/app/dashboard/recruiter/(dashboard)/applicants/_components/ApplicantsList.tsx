"use client";

import NotFound from "@/components/Custom/NotFound";
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
import { toast } from "@/components/ui/use-toast";
import { statusButtonColors } from "@/constants";
import { getMessage } from "@/lib/utils";
import { getApplicants } from "@/services/jobs.service";
import { updateApplicantStatus } from "@/services/recruiter.service";
import { IApplicant, IAvailableStatus } from "@/types/jobs";
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
import { useEffect, useState } from "react";
import { InterviewForm } from "../_form/Interviewform";

export function ApplicantsComponent({ jobId }: { jobId: string }) {
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
        <NotFound hideBackButton title="No applicant's" />
      )}
    </>
  );
}

function ApplicantCard({ applicant }: { applicant: IApplicant }) {
  const [status, setStatus] = useState<IAvailableStatus>(
    applicant.status as IAvailableStatus,
  );
  const [open, setOpen] = useState(false);
  const [availableStatus, setAvailableStatus] = useState<IAvailableStatus[]>(
    [],
  );
  const updateAvailableStatus = (status: IAvailableStatus) => {
    if (status === "applied") {
      setAvailableStatus(["applied", "interview", "underReview", "rejected"]);
    } else if (status === "interview") {
      setAvailableStatus(["interview", "shortlisted", "rejected", "hired"]);
    } else if (status === "shortlisted") {
      setAvailableStatus(["shortlisted", "rejected", "hired"]);
    } else if (status === "rejected") {
      setAvailableStatus(["rejected"]);
    } else if (status === "underReview") {
      setAvailableStatus(["underReview", "interview", "rejected"]);
    } else if (status === "hired") {
      setAvailableStatus(["hired"]);
    }
  };

  const updateStatus = async (status: IAvailableStatus) => {
    try {
      await updateApplicantStatus({
        job: applicant.job,
        user: applicant.user.email,
        status,
      });
      toast({
        title: "Status updated successfully",
        duration: 1000,
      });
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    updateAvailableStatus(status);
  }, [status]);

  return (
    <>
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
                  className={`flex w-full gap-1 capitalize text-foreground hover:${statusButtonColors[status]}/70 border border-muted ${statusButtonColors[status]}`}
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
                  onValueChange={(value: string) => {
                    if (value === "interview") {
                      setOpen(true);
                    } else {
                      updateStatus(value as IAvailableStatus);
                      setStatus(value as IAvailableStatus);
                    }
                  }}
                >
                  {availableStatus.map((availableStatus, index) => (
                    <DropdownMenuRadioItem
                      disabled={status === availableStatus}
                      value={availableStatus}
                      key={index}
                      className="cursor-pointer capitalize"
                    >
                      {availableStatus}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              className="min-w-full flex-grow"
              target={"_blank"}
              href={applicant.resume}
            >
              <Button
                className="flex w-full items-center gap-1"
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
      <InterviewForm
        defaultValues={{
          startDate: "" as any,
          time: "",
          agenda: "",
        }}
        open={open}
        jobId={applicant.job}
        setOpen={setOpen}
        user={applicant.user}
        key={applicant._id}
        setStatus={setStatus}
      />
    </>
  );
}