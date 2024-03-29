"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CustomForm } from "./CusotomForm";
import { z } from "zod";
import { getMessage } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { useDispatch } from "react-redux";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { RawDraftContentState } from "react-draft-wysiwyg";
import { updateCompany } from "@/services/company.service";
import { setCompany } from "@/store/reducers/company.slice";
import { ImageSchema } from "@/lib/schema";

interface ICompanyProfile {
  defaultValues: {
    name: string;
    website: string;
    logo: string;
    tagline: string;
    email: string;
    industry: string;
    foundedOn: string;
    imageOfCEO: string;
    description: RawDraftContentState;
    ceo: string;
    revenue: string;
    headquarters: string;
    size: string;
    coverPhoto: string;
  };
}

export function EditCompanyProfile({ defaultValues }: ICompanyProfile) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const formSchema = z.object({
    name: z.string().min(3, "Company name must be at least 3 characters long"),
    website: z.string().url("Invalid URL"),
    tagline: z
      .string()
      .min(10, "Company tagline must be at least 10 characters long"),
    industry: z.enum(["Software", "Technology", "Products", "Other"], {
      errorMap: () => ({ message: "Please select an industry" }),
    }),
    foundedOn: z
      .string()
      .min(4, "Invalid year")
      .refine(
        (data) =>
          Number(data) > 1000 && Number(data) < new Date().getFullYear() + 1,
        {
          message: "Invalid year",
        },
      ),
    revenue: z.string().min(4, "Invalid revenue"),
    headquarters: z.string().min(5, "Invalid headquarters"),
    size: z
      .string()
      .min(1, "Invalid size")
      .refine((data) => Number(data) > 0, {
        message: "Invalid size",
        path: ["size"],
      }),
    email: z.string().email("Invalid email"),
    ceo: z.string().min(3, "Invalid input"),
    description: z
      .string()
      .min(10, "Company description must be at least 10 characters long"),
    logo: ImageSchema,
    imageOfCEO: ImageSchema,
  });
  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      const data = await updateCompany(formData);
      if (data) {
        toast({
          title: "Profile updated successfully",
        });
        dispatch(setCompany(data?.data));
      }
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
        <Pencil2Icon
          onClick={() => setOpen(true)}
          className="size-5 cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="mt-1 h-full overflow-y-scroll pb-10 sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-3 text-xl text-foreground/60">
            Edit Company Profile
          </DialogTitle>
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
