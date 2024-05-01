"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AccentButton from "@/components/Buttons/AccentButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import {
  apply,
  isApplied,
  isSaved,
  removeSavedJob,
  saveJob,
  updateApplicantAssessment,
} from "@/services/jobs.service";
import { useStateSelector } from "@/store";
import { IApplicant, IJob } from "@/types/jobs";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NotepadText } from "lucide-react";
import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import { z } from "zod";

export default function JobActions({ job }: { job: IJob }) {
  const [isJobApplied, setIsApplied] = useState(false);
  const [applied, setApplied] = useState<undefined | IApplicant>(undefined);
  const [isValidForTest, setIsValidForTest] = useState(false);
  const [isJobSaved, setIsSaved] = useState(false);
  const { isAuth, user } = useStateSelector((state) => state.user);
  const { push } = useRouter();

  useEffect(() => {
    const check =
      !!job.assessments.length &&
      isJobApplied &&
      applied?.isAssessmentDone === false;

    setIsValidForTest(check);
  }, [applied?.isAssessmentDone, isJobApplied, job.assessments.length]);
  const applyJob = async (selectedResume?: string) => {
    if (job.status === "closed") {
      toast({
        title: "This job is closed.",
        variant: "destructive",
      });
      return;
    }
    try {
      const resume = user?.resume?.resumes[user?.resume?.primary]?.url;
      if (!resume) {
        toast({
          title: "Please add a resume.",
          description: "You can add your resume from your profile page",
          action: (
            <Button variant="outline" onClick={() => push("/profile")}>
              add
            </Button>
          ),
          variant: "destructive",
        });
        return;
      }

      const description = job.description
        .concat("\n\n skills: ")
        .concat(job.skills.join(", "));

      const response = await apply({
        job: job?.id as string,
        resume: selectedResume ? selectedResume : resume,
        description,
      });
      const application = response.data;
      console.log(response);
      setIsApplied(true);
      setApplied(application);
      toast({
        title: "Applied successfully",
        description: "We will contact you shortly",
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
    if (!isAuth) return;
    (async () => {
      try {
        const [savedResponse, appliedResponse] = await Promise.all([
          isSaved(job?.id as string),
          isApplied(job?.id as string),
        ]);

        setIsSaved(savedResponse.data);
        const { data } = appliedResponse;
        setApplied(data?.application);
        setIsApplied(data?.status);
      } catch (error) {
        console.log(error);
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    })();
  }, [isAuth]);
  return (
    <div className="mt-auto flex flex-col gap-3 pb-3">
      {isAuth ? (
        <>
          <div className="flex rounded-full bg-primaryColor">
            <PrimaryButton
              disabled={isJobApplied}
              onClick={() => applyJob()}
              className={`rounded-none rounded-l-full border-none px-2 ${isJobApplied && "cursor-not-allowed opacity-70"}`}
            >
              <span className="flex items-center gap-1">
                <span className="hidden ps-2 md:block">
                  {isJobApplied ? "applied" : "apply"}
                </span>
                <CheckIcon />
              </span>
            </PrimaryButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="ring-0 focus-within:ring-0 focus:ring-0 focus-visible:ring-0"
                disabled={isJobApplied}
              >
                <AccentButton className="h-full rounded-none rounded-r-full border-none px-2">
                  <CaretSortIcon />
                </AccentButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-center">
                  Resume&apos;s
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.resume?.resumes?.map((resume, index) => (
                  <div
                    key={index}
                    className="mb-2 flex w-full items-center justify-between gap-2 px-2"
                  >
                    <Link
                      href={resume.url}
                      className="text-nowrap text-sm capitalize text-foreground/70 hover:underline"
                    >
                      {resume.name}
                    </Link>
                    <TooltipProvider delayDuration={10}>
                      <Tooltip>
                        <TooltipTrigger className="ring-0">
                          <PrimaryButton
                            className="px-2 "
                            onClick={() => applyJob(resume.url)}
                          >
                            <CheckIcon />
                          </PrimaryButton>
                        </TooltipTrigger>
                        <TooltipContent className="border bg-background text-foreground">
                          <p>Apply with this resume.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
                {user?.resume?.resumes?.length === 0 && (
                  <p className="py-3 text-center text-sm text-foreground/70">
                    No resume&apos;s
                  </p>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {isJobSaved ? (
            <SecondaryButton
              onClick={async () => {
                await removeSavedJob(job?.id as string);
                setIsSaved(false);
              }}
              className="px-3"
            >
              <span className="flex items-center justify-center gap-1">
                <span className="hidden ps-2 md:block">remove</span>
                <BookmarkFilledIcon />
              </span>
            </SecondaryButton>
          ) : (
            <SecondaryButton
              onClick={async () => {
                await saveJob(job?.id as string);
                setIsSaved(true);
              }}
              className="px-3"
            >
              <span className="mx-auto flex items-center justify-center gap-1">
                <span className="hidden ps-2 md:block">save</span>
                <BookmarkIcon />
              </span>
            </SecondaryButton>
          )}
        </>
      ) : (
        <>
          <PrimaryButton onClick={() => push("/login")} className="px-3">
            <span className="flex items-center  justify-center gap-1">
              <span className="hidden ps-2 md:block">apply</span> <CheckIcon />
            </span>
          </PrimaryButton>
          <SecondaryButton onClick={() => push("/login")} className="px-3">
            <span className="flex items-center  justify-center gap-1">
              <span className="hidden ps-2 md:block">save</span>
              <BookmarkIcon />
            </span>
          </SecondaryButton>
        </>
      )}
      {job.status === "closed" && (
        <p className="text-center text-xs text-red-500">(this job is closed)</p>
      )}
      {isValidForTest && <JobAssessment setApplied={setApplied} job={job} />}
    </div>
  );
}

function JobAssessment({
  job,
  setApplied,
}: {
  job: IJob;
  setApplied: Dispatch<SetStateAction<IApplicant | undefined>>;
}) {
  const [open, setOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState<{
    test: {
      no: number;
      question: string;
      answer: string;
    }[];
  }>({
    test: [],
  });

  useEffect(() => {
    const test = job.assessments.map((a) => ({
      no: a.no,
      question: a.question,
      answer: "",
    }));
    setDefaultValues({ test });
  }, [job.assessments]);

  const formSchema = z.object({
    test: z
      .array(
        z.object({
          no: z.number(),
          question: z.string(),
          answer: z.string(),
        }),
      )
      .refine(
        (data) => {
          const validatedData = data.map((a) => a.answer.length > 1);
          const notValid = validatedData.find((a) => a === false);
          if (notValid === false) return false;
          return true;
        },
        {
          message: "Please answer all questions.",
        },
      ),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateApplicantAssessment({
        job: job.id,
        assessments: values.test,
        expectedAnswers: job.assessments.map((a) => {
          return { no: a.no, expectedAnswer: a.expectedAnswer };
        }),
        description: job.description
          .concat("\n\n skills: ")
          .concat(job.skills.join(", ")),
      });
      setApplied((prev) =>
        prev?.isAssessmentDone === false
          ? { ...prev, isAssessmentDone: true }
          : prev,
      );
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <SecondaryButton size="sm">
            <span className="flex flex-1 items-center justify-center">
              <NotepadText size={16} />
            </span>
          </SecondaryButton>
        </div>
      </DialogTrigger>
      <DialogContent className="mt-1 max-h-screen overflow-y-scroll pt-10 sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="pb-3 text-xl text-foreground/70">
            <div className="flex justify-between text-nowrap">
              <span>Job Assessment</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <CustomForm
          defaultValues={defaultValues}
          formSchema={formSchema}
          onSubmit={onSubmit}
          action="Submit"
          className="mx-auto mb-10 mt-10 max-w-[700px]"
        />
      </DialogContent>
    </Dialog>
  );
}
