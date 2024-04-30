"use client";

import AccentButton from "@/components/Buttons/AccentButton";
import DangerButton from "@/components/Buttons/DangerButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import EditJobDialogue from "@/components/FormsAndDialog/EditJob";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { updateJobStatus } from "@/services/company.service";
import { useStateSelector } from "@/store";
import { IJob } from "@/types/jobs";
import { NotepadText } from "lucide-react";
import { markdownToDraft } from "markdown-draft-js";
import { useState } from "react";
import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";

export default function JobActions({ job, id }: { job: IJob; id: string }) {
  const companyData = useStateSelector((state) => state.company);
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
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2 sm:flex-row">
        <EditJobDialogue
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
      {companyData?.plan?.features["jobAssessments"] && (
        <MangeJobAssessment job={job} />
      )}
    </div>
  );
}

function MangeJobAssessment({ job }: { job: IJob }) {
  const [open, setOpen] = useState(false);
  const defaultValues = {
    assessments: job?.assessments?.length
      ? job.assessments
      : [
          {
            no: 1,
            question: "",
            expectedAnswer: "",
          },
        ],
  };
  const formSchema = z.object({
    assessments: z
      .array(
        z.object({
          no: z.number(),
          question: z.string(),
          expectedAnswer: z.string().optional(),
        }),
      )
      .refine(
        (data) => {
          const validatedData = data.map((a) => a.question.length > 1);
          const notValid = validatedData.find((a) => a === false);
          if (notValid === false) return false;
          return true;
        },
        {
          message: "All questions must have a question",
        },
      ),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer p-1">
            <SecondaryButton size="sm">
              <span className="flex flex-1 items-center justify-center">
                <NotepadText size={16} />
              </span>
            </SecondaryButton>
          </div>
        </DialogTrigger>
        <DialogContent className="mt-1 h-full overflow-y-scroll pt-10 sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="pb-3 text-xl text-foreground/70">
              Job Assessment
            </DialogTitle>
          </DialogHeader>
          <CustomForm
            defaultValues={defaultValues}
            formSchema={formSchema}
            onSubmit={onSubmit}
            action="Update"
            className="mx-auto mb-10 mt-10 max-w-[700px]"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
