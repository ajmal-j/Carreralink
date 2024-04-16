"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { CustomForm } from "./CustomForm";
import { z } from "zod";
import { DateSchema } from "@/lib/schema";
import { toast } from "../ui/use-toast";
import { getMessage } from "@/lib/utils";
import { addExperience, updateExperience } from "@/services/user.service";
import { useDispatch } from "react-redux";
import { updateExperienceState } from "@/store/reducers/user.slice";
import { Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import AccentButton from "../Buttons/AccentButton";

interface IEditExperience {
  id?: string;
  defaultValues: {
    companyName: string;
    position: string;
    startDate: Date | string;
    endDate: Date | string;
  };
}

export function EditExperience({ defaultValues, id }: IEditExperience) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const formSchema = z.object({
    companyName: z
      .string()
      .min(5, "Company name must be at least 5 characters"),
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
