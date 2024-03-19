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
import { toast } from "../ui/use-toast";
import { getMessage } from "@/lib/utils";
import { addExperience, updateExperience } from "@/services/user.service";
import { useDispatch } from "react-redux";
import { updateExperienceState } from "@/store/reducers/user.slice";

interface IEditExperience {
  children: ReactNode;
  id?: string;
  defaultValues: {
    company: string;
    position: string;
    startDate: Date | string;
    endDate: Date | string;
  };
}

export function EditExperience({
  children,
  defaultValues,
  id,
}: IEditExperience) {
  const dispatch = useDispatch();
  const formSchema = z.object({
    company: z.string().min(5, "Company name must be at least 5 characters"),
    position: z.string().min(5, "Position must be at least 5 characters"),
    startDate: DateSchema,
    endDate: DateSchema,
  });

  const onSubmit = async (values: any) => {
    try {
      let data;
      if (id) {
        data = await updateExperience({ id, ...values });
      } else data = await addExperience(values);
      if (data) {
        toast({
          title: "Experience updated successfully",
        });
      }
      let experience = await data?.data?.experience;
      if (experience) dispatch(updateExperienceState(experience));
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
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
