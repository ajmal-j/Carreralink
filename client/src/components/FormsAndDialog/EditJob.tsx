"use client";

import { CustomForm } from "@/components/FormsAndDialog/CusotomForm";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { IJob } from "@/types/jobs";
import { RawDraftContentState } from "react-draft-wysiwyg";
import { updateJob } from "@/services/company.service";

interface IPage {
  defaultValues: Omit<
    IJob,
    | "id"
    | "_id"
    | "createdAt"
    | "updatedAt"
    | "company"
    | "applicants"
    | "href"
    | "isPaused"
    | "status"
    | "description"
  > & {
    description: RawDraftContentState;
  };
  id: string;
  editFunction?: (values: Record<string, any>, id: string) => void;
}

export default function EditJobDialogue({
  defaultValues,
  id,
  editFunction,
}: IPage) {
  const [open, setOpen] = useState(false);
  const { refresh } = useRouter();
  const formSchema = z
    .object({
      title: z.string().min(1, "Required"),
      type: z.string().min(1, "Required"),
      category: z.string().min(1, "Required"),
      officeLocation: z.string().optional(),
      openings: z
        .string()
        .min(1, "Required")
        .refine((value) => {
          const num = parseInt(value);
          if (isNaN(num)) return false;
          return num > 0;
        }),
      workSpace: z.string().min(1, "Required"),
      pay: z
        .object({
          minimum: z.string(),
          maximum: z.string(),
          rate: z.string(),
        })
        .refine(
          ({ minimum, maximum, rate }) => {
            const min = parseFloat(minimum);
            const max = parseFloat(maximum);
            const rateEmpty = !rate.trim();
            if (isNaN(min) || isNaN(max) || min > max || rateEmpty) {
              return false;
            }
            return true;
          },
          {
            message: "Invalid Pay | Rate is Required",
          },
        ),
      skills: z
        .array(z.string().min(1, "Required minimum 1"))
        .refine((value) => value.length > 0, {
          message: "Required minimum 1",
          path: ["skills"],
        }),
      description: z.string().min(15, "Description is too short"),
    })
    .refine(
      (data) => {
        if (
          data.workSpace !== "Remote" &&
          data.workSpace &&
          !data.officeLocation
        ) {
          return false;
        }
        return true;
      },
      {
        message: "Required",
        path: ["officeLocation"],
      },
    );

  const onSubmit = async (data: any) => {
    try {
      await updateJob(id, data);
      toast({
        title: "Job Updated",
        description: "Your Job has been updated",
      });
      setOpen(false);
      setTimeout(() => {
        refresh();
      }, 400);
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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pencil2Icon
            onClick={() => setOpen(true)}
            className="size-5 cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="mt-1 h-full overflow-y-scroll pt-10 sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-3xl text-foreground/70">
              Edit Job
            </DialogTitle>
          </DialogHeader>
          <CustomForm
            setOpen={editFunction ? setOpen : undefined}
            formAction={editFunction}
            id={id}
            className="mx-auto mb-10 mt-2 max-w-[700px]"
            defaultValues={defaultValues}
            // @ts-expect-error
            formSchema={formSchema}
            onSubmit={onSubmit}
            action="Post"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
