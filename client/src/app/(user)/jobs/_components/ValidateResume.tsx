"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import AccentButton from "@/components/Buttons/AccentButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Markdown from "@/components/Custom/Markdown";
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
import { validateResume } from "@/services/ai.service";
import { useStateSelector } from "@/store";
import { IJob } from "@/types/jobs";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader, Sparkles } from "lucide-react";

export default function ValidateResume({ job }: { job: IJob }) {
  const [result, setResult] = useState(``);
  const [loading, setLoading] = useState(false);
  const [previousResume, setPreviousResume] = useState("");
  const { isAuth, user } = useStateSelector((state) => state.user);
  const { push } = useRouter();

  const validate = async (selectedResume?: string) => {
    if (!isAuth) {
      toast({
        title: "Please login to use this feature.",
        action: (
          <Button variant="outline" onClick={() => push("/login")}>
            login
          </Button>
        ),
        variant: "destructive",
      });
      return;
    }
    if (job.status === "closed") {
      toast({
        title: "This job is closed.",
        variant: "destructive",
      });
      return;
    }
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
    const currentResume = selectedResume ? selectedResume : (resume as string);
    if (currentResume === previousResume) {
      return;
    } else setPreviousResume(currentResume);

    const description = job.description
      .concat("\n\n skills: ")
      .concat(job.skills.join(", "));

    try {
      setLoading(true);
      const response = await validateResume({
        description,
        resume: currentResume,
      });
      const { result } = response.data;
      setResult(result);
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 rounded-md px-3 py-5">
      <div className="mb-3 flex justify-end">
        <div className="shadow-roundedPrimaryColor flex rounded-full bg-primaryColor">
          <PrimaryButton
            className="rounded-none rounded-l-full border-none px-2"
            onClick={() => validate()}
          >
            <span className="flex flex-nowrap items-center gap-1 ps-1 hover:animate-pulse">
              <Sparkles size={22} />
              <span className="text-lg font-semibold">Generate</span>
            </span>
          </PrimaryButton>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="ring-0 focus-within:ring-0 focus:ring-0 focus-visible:ring-0"
              disabled={!isAuth}
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
                          onClick={() => validate(resume.url)}
                        >
                          <CheckIcon />
                        </PrimaryButton>
                      </TooltipTrigger>
                      <TooltipContent className="border bg-background text-foreground">
                        <p>Generate with this resume.</p>
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
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-5">
          <Loader className="animate-spin" />
        </div>
      ) : result ? (
        <Markdown className="px-3">{result}</Markdown>
      ) : (
        <h1 className="mb-3 text-center text-lg font-semibold text-foreground/70">
          Check you&lsquo;r resume is good for this job.
        </h1>
      )}
    </div>
  );
}
