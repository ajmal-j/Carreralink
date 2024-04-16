"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CustomForm } from "./CustomForm";
import { z } from "zod";
import { updateProfile } from "@/services/user.service";
import { getMessage } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/reducers/user.slice";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface IEditProfile {
  defaultValues: {
    username: string;
    contact: string | number;
    currentStatus: string;
    place: string;
    workingAt: string;
    about: string;
    portfolioLink: string;
  };
}

export function EditProfile({ defaultValues }: IEditProfile) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const formSchema = z.object({
    username: z.string().min(5, "Username must be at least 5 characters"),
    contact: z.string().min(10, "Invalid number").max(12, "Invalid number"),
    currentStatus: z
      .enum(["student", "working", "job seeking", "freelancing"], {
        required_error: "Please select your current status",
      })
      .optional(),
    place: z.string().optional(),
    workingAt: z
      .string()
      .optional()
      .refine((data) => {
        if (!data) return true;
        data.length > 5,
          {
            message: "Working at must be at least 5 characters",
            path: ["workingAt"],
          };
      }),
    about: z.string().optional(),
    portfolioLink: z.string().url("Invalid url").optional(),
  });
  const onSubmit = async (values: any) => {
    try {
      const data = await updateProfile(values);
      if (data) {
        toast({
          title: "Profile updated successfully",
        });
        dispatch(setUser(data?.data));
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
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
