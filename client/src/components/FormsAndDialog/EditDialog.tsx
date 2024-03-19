"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { CustomForm } from "./CusotomForm";
import { z } from "zod";
import { updateProfile } from "@/services/user.service";
import { getMessage } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/reducers/user.slice";

interface IEditProfile {
  children: ReactNode;
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

export function EditProfile({ children, defaultValues }: IEditProfile) {
  const dispatch = useDispatch();
  const formSchema = z.object({
    username: z.string().min(5, "Username must be at least 5 characters"),
    contact: z.string().min(10, "Invalid number").max(12, "Invalid number"),
    currentStatus: z.enum(
      ["student", "working", "job seeking", "freelancing"],
      { required_error: "Please select your current status" },
    ),
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
    about: z.string(),
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
