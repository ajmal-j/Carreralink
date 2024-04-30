"use client";

import DangerButton from "@/components/Buttons/DangerButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { updateAssessment } from "@/services/jobs.service";
import { IJob } from "@/types/jobs";
import { Cross1Icon } from "@radix-ui/react-icons";
import { NotepadText } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export default function MangeJobAssessment({ job }: { job: IJob }) {
  const [open, setOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    assessments: job?.assessments?.length
      ? job.assessments
      : [
          {
            no: 1,
            question: "",
            expectedAnswer: "",
          },
        ],
  });
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
    try {
      await updateAssessment({
        job: job.id,
        assessments: data.assessments,
      });
      setOpen(false);
      setDefaultValues({
        assessments: data.assessments.length
          ? data.assessments
          : [
              {
                no: 1,
                question: "",
                expectedAnswer: "",
              },
            ],
      });
      toast({
        title: "Assessment updated successfully",
      });
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <div>
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
                <DangerButton
                  onClick={() => onSubmit({ assessments: [] })}
                  className="w-min px-3"
                  icon={<Cross1Icon className="size-4 pe-1" />}
                >
                  clear all
                </DangerButton>
              </div>
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
