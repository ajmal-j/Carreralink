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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { statusButtonColors } from "@/constants";
import { getMessage } from "@/lib/utils";
import { getApplicants } from "@/services/jobs.service";
import { updateApplicantStatus } from "@/services/recruiter.service";
import { IApplicant, IAvailableStatus } from "@/types/jobs";
import { IResponseData } from "@/types/paginateResponse";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
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
import { useRouter } from "next/navigation";
import { createChat } from "@/services/chat.service";
import { useStateSelector } from "@/store";

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
      setAvailableStatus(
        applicant?.reasonForRejection
          ? ["rejected", "underReview"]
          : ["rejected"],
      );
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
  }, [status, applicant]);

  return (
    <>
      <div className="flex cursor-pointer gap-3 rounded-xl bg-foreground/5 px-4 py-3 transition-colors duration-200 hover:bg-foreground/10 dark:bg-foreground/[0.02] hover:dark:bg-foreground/5">
        <Avatar className="size-12">
          <AvatarImage src={applicant.user.profile} />
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Link
            href={`/dashboard/recruiter/jobs/applicant/${applicant.user.username}`}
            className="font-semibold capitalize hover:underline"
          >
            {applicant.user.username}
          </Link>
          <div className="flex flex-wrap gap-1">
            <p className="flex gap-1 text-sm text-foreground/70">
              <span>resume score :</span> <span>{applicant.score}</span>
            </p>
            {applicant?.isAssessmentDone && (
              <p className="flex gap-1 text-sm text-foreground/70 before:content-[',']">
                <span>test score :</span>{" "}
                <span>{applicant.assessmentScore}</span>
              </p>
            )}
          </div>
          <p className="text-sm text-foreground/70">{applicant.user.email}</p>
          <p className="block text-sm text-foreground/70">
            <span className="pe-1">applied</span>
            {formatDistanceToNow(applicant.createdAt)}
          </p>
          {applicant?.reasonForRejection && applicant.status === "rejected" && (
            <p className="text-sm text-red-700/80">
              {applicant?.reasonForRejection}
            </p>
          )}
        </div>
        <div className="flex h-full gap-2">
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
          <MoreOptions applicant={applicant} />
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

function MoreOptions({ applicant }: { applicant: IApplicant }) {
  const { push } = useRouter();
  const recruiter = useStateSelector((state) => state.recruiter.recruiter);

  const goToChat = async ({ user }: { user: string }) => {
    try {
      const response = await createChat({
        data: {
          user,
          company: recruiter?.company.id,
        },
      });
      const { id } = await response.data;
      push(`/dashboard/recruiter/messages/${id}`);
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ms-auto flex size-6 min-w-[1.5rem] items-center justify-center rounded-full border bg-foreground/10 transition-colors duration-200 ease-in-out hover:bg-foreground/30">
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          <Link
            className="block w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-150 ease-in-out hover:bg-foreground/10"
            href={`/dashboard/recruiter/jobs/${applicant.job}`}
          >
            Job
          </Link>
          <Link
            className="block w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-150 ease-in-out hover:bg-foreground/10"
            href={`/dashboard/recruiter/jobs/applicant/${applicant.user.username}`}
          >
            Applicant
          </Link>
          <div className="mt-2 flex flex-col gap-1">
            <Button
              variant={"outline"}
              onClick={() => goToChat({ user: applicant.user.email })}
              size="sm"
            >
              Message
            </Button>
            {applicant.isAssessmentDone && (
              <Dialog>
                <DialogTrigger>
                  <Button variant={"outline"} size="sm">
                    View Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Assessment by {applicant.user.username}
                    </DialogTitle>
                    <DialogDescription>
                      <h6 className="mb-2 mt-3 text-end">
                        Score : {applicant.assessmentScore}
                      </h6>
                      <div className="flex flex-col gap-2">
                        {applicant.assessments.map((assessment) => (
                          <div
                            key={assessment.no}
                            className="flex flex-col gap-1"
                          >
                            <h5>Question {assessment.no} :</h5>
                            <div className="mx-2 flex flex-col rounded-md bg-foreground/10 px-2 py-2">
                              <div className="flex gap-1 capitalize">
                                <span>question : </span>
                                <span>{assessment.question}</span>
                              </div>
                              <div className="flex gap-1 capitalize">
                                <span>answer : </span>
                                <span>{assessment.answer}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
