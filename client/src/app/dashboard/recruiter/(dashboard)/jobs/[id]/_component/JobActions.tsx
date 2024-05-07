"use client";

import AccentButton from "@/components/Buttons/AccentButton";
import DangerButton from "@/components/Buttons/DangerButton";
import MangeJobAssessment from "@/components/Custom/MangeJobAssessments";
import EditJobDialogueByRecruiter from "@/components/FormsAndDialog/EditJobByRecruiter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { updateJobStatus } from "@/services/recruiter.service";
import { IJob } from "@/types/jobs";
import { markdownToDraft } from "markdown-draft-js";
import { useState } from "react";

export const JobActions = ({ id, job }: { id: string; job: IJob }) => {
  const [status, setStatus] = useState(job.status);
  const [open, setOpen] = useState(false);
  const updateStatus = async ({ status }: { status: "open" | "closed" }) => {
    try {
      await updateJobStatus({
        job: id,
        status,
      });
      setStatus(status);
      toast({
        title: `Job ${status === "open" ? "Opened" : "Closed"} successfully.`,
      });
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    } finally {
      setOpen(false);
    }
  };
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-2 sm:flex-row">
        <EditJobDialogueByRecruiter
          defaultValues={{
            title: job.title,
            type: job.type,
            category: job.category,
            openings: job.openings,
            workSpace: job.workSpace,
            officeLocation: job.officeLocation,
            skills: job.skills,
            pay: job.pay,
            description: markdownToDraft(job.description),
          }}
          id={id}
        />
        {status === "open" ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="h-min">
              <DangerButton size="sm">close</DangerButton>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 text-sm" align="end">
              <h1>Are you sure you want to close this job?</h1>
              <div>
                <DangerButton
                  onClick={() => updateStatus({ status: "closed" })}
                  className="ms-auto w-min"
                  size="sm"
                >
                  confirm
                </DangerButton>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="h-min">
              <AccentButton size="sm">open</AccentButton>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 text-sm" align="end">
              <h1>Are you sure you want to re open this job?</h1>
              <div className="flex justify-end">
                <AccentButton
                  onClick={() => updateStatus({ status: "open" })}
                  className="w-min"
                  size="sm"
                >
                  confirm
                </AccentButton>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      {job?.company?.plan?.features?.jobAssessments && (
        <MangeJobAssessment job={job} />
      )}
    </div>
  );
};
