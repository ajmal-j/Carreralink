"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useRef, useState } from "react";
import { CustomForm } from "./CustomForm";
import { z } from "zod";
import { DateSchema } from "@/lib/schema";
import {
  addEducation,
  updateEducation,
  updateProfile,
} from "@/services/user.service";
import { toast } from "../ui/use-toast";
import { setUser, updateEducationState } from "@/store/reducers/user.slice";
import { useDispatch } from "react-redux";
import { getMessage } from "@/lib/utils";
import { isAfter } from "date-fns";
import { Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import AccentButton from "../Buttons/AccentButton";

interface IEditEducation {
  id?: string;
  defaultValues: {
    institution: string;
    degree: string;
    startDate: Date | string;
    endDate: Date | string;
  };
}

export function EditEducation({ id, defaultValues }: IEditEducation) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const formSchema = z.object({
    institution: z
      .string()
      .min(5, "Institution name must be at least 5 characters"),
    degree: z.string().min(5, "Degree must be at least 5 characters"),
    startDate: DateSchema,
    endDate: DateSchema,
  });
  // .refine((data) => {
  //   if (data.endDate === "Present") {
  //     return true;
  //   }
  //   isAfter(data.startDate, data.endDate),
  //     {
  //       message: "End date must be after start date",
  //       path: ["endDate"],
  //     };
  // });
  const onSubmit = async (values: any) => {
    try {
      let data;
      if (id) {
        data = await updateEducation({ id, ...values });
      } else data = await addEducation(values);
      if (data) {
        toast({
          title: "Education updated successfully",
        });
      }
      let education = await data?.data?.education;
      console.log(education);
      if (education) dispatch(updateEducationState(education));

      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {id ? (
          <div
            onClick={() => setOpen(false)}
            className="flex cursor-pointer items-center gap-1 pe-3 ps-3 "
          >
            <Pencil2Icon className="size-4" />
          </div>
        ) : (
          <AccentButton
            onClick={() => setOpen(false)}
            className="w-min rounded-sm px-3 dark:border-foreground/70 dark:shadow-roundedPrimaryShadow"
          >
            <PlusIcon />
          </AccentButton>
        )}
      </DialogTrigger>
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
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
