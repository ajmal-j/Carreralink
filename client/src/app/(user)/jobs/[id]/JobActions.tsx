"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { isSaved, removeSavedJob, saveJob } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function JobActions({ job }: { job: IJob }) {
  const [isJobApplied, setIsApplied] = useState(false);
  const [isJobSaved, setIsSaved] = useState(false);
  console.log(job);
  useEffect(() => {
    (async () => {
      const response = await isSaved(job?.id as string);
      setIsSaved(response.data);
    })();
  }, []);
  return (
    <div className="mt-auto flex flex-col gap-3 pb-3">
      <PrimaryButton className="px-3">
        <span className="flex items-center gap-1">
          <span className="hidden ps-2 md:block">Apply</span> <CheckIcon />
        </span>
      </PrimaryButton>
      {isJobSaved ? (
        <SecondaryButton
          onClick={async () => {
            await removeSavedJob(job?.id as string);
            setIsSaved(false);
          }}
          className="px-3"
        >
          <span className="flex items-center gap-1">
            <span className="hidden ps-2 md:block">Remove</span>
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
          <span className="flex items-center gap-1">
            <span className="hidden ps-2 md:block">Save</span>
            <BookmarkIcon />
          </span>
        </SecondaryButton>
      )}
    </div>
  );
}
