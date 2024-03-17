"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { CustomForm } from "./CusotomForm";
import { z } from "zod";
import { DateSchema } from "@/lib/schema";

interface IEditEducation {
  children: ReactNode;
  defaultValues: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  };
}

export function EditEducation({ children, defaultValues }: IEditEducation) {
  const formSchema = z
    .object({
      institution: z
        .string()
        .min(5, "Institution name must be at least 5 characters"),
      degree: z.string().min(5, "Degree must be at least 5 characters"),
      startDate: DateSchema,
      endDate: DateSchema,
    })
    .refine((data) => data.startDate < data.endDate, {
      message: "End date must be after start date",
      path: ["endDate"],
    });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-5 text-2xl font-thin">
            Edit Education
          </DialogTitle>
        </DialogHeader>
        <CustomForm
          defaultValues={defaultValues}
          // @ts-ignore
          formSchema={formSchema}
          onSubmit={(values) => alert(JSON.stringify(values))}
        />
      </DialogContent>
    </Dialog>
  );
}
