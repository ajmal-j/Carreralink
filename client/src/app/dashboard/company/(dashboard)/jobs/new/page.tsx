"use client";
import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { createJob } from "@/services/jobs.service";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

export default function NewJob() {
  const { push } = useRouter();
  const defaultValues = {
    title: "",
    type: "",
    category: "",
    workSpace: "",
    officeLocation: "",
    openings: "",
    skills: [],
    pay: {
      minimum: "",
      maximum: "",
      rate: "",
    },
    description: "",
  };
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
      await createJob(data);
      toast({
        title: "Job Posted",
        description: "Your Job has been posted",
      });
      push("/dashboard/company/jobs");
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
    <div>
      <h1 className="mt-5 text-center text-xl text-foreground/70 md:text-3xl">
        Post a new Job
      </h1>
      <CustomForm
        className="mx-auto mb-10 mt-10 max-w-[700px]"
        defaultValues={defaultValues}
        // @ts-expect-error
        formSchema={formSchema}
        onSubmit={onSubmit}
        action="Post"
      />
    </div>
  );
}
