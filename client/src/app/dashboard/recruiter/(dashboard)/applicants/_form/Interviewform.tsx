"use client";

import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { createInterview } from "@/services/interview.service";
import { IApplicant, IAvailableStatus } from "@/types/jobs";
import { z } from "zod";

interface IInterview {
  startDate: Date;
  time: string;
  agenda: string;
}

export function InterviewForm({
  defaultValues,
  user,
  open,
  setOpen,
  setStatus,
  jobId,
}: {
  user: IApplicant["user"];
  defaultValues: IInterview;
  open: boolean;
  jobId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<IAvailableStatus>>;
}) {
  const onSubmit = async (values: IInterview) => {
    try {
      await createInterview({
        ...values,
        applicant: user._id,
        job: jobId,
      });
      setStatus("interview");
      setOpen(false);
      toast({
        title: "Interview scheduled successfully",
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
  let dateToCheck = new Date();
  dateToCheck.setDate(dateToCheck.getDate() - 1);
  const formSchema = z.object({
    startDate: z.date().refine((date) => date >= dateToCheck, {
      message: "Start date must be in the future",
    }),
    time: z.string().min(2, "Required"),
    agenda: z.string(),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Scheduling interview with {user.username}
          </DialogDescription>
        </DialogHeader>
        <CustomForm
          defaultValues={defaultValues}
          formSchema={formSchema}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
