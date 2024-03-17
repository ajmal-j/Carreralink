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

interface IEditExperience {
  children: ReactNode;
  defaultValues: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
  };
}

export function EditExperience({ children, defaultValues }: IEditExperience) {
  const formSchema = z
    .object({
      company: z.string().min(5, "Company name must be at least 5 characters"),
      position: z.string().min(5, "Position must be at least 5 characters"),
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
            Edit Experience
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
