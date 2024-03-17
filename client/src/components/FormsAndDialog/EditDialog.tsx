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

interface IEditProfile {
  children: ReactNode;
  defaultValues: {
    username: string;
    email: string;
    contact: string | number;
    currentStatus: string;
    place: string;
    workingAt: string;
  };
}

export function EditProfile({ children, defaultValues }: IEditProfile) {
  const formSchema = z.object({
    username: z.string().min(5, "Username must be at least 5 characters"),
    email: z.string().email("Invalid email"),
    contact: z.string().min(10, "Invalid number").max(12, "Invalid number"),
    currentStatus: z.enum(
      ["student", "working", "job seeking", "freelancing"],
      { required_error: "Please select your current status" },
    ),
    place: z.string().min(5, "Place must be at least 5 characters"),
    workingAt: z.string().min(5, "Work must be at least 5 characters"),
  });
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
          onSubmit={(values) => alert(JSON.stringify(values))}
        />
      </DialogContent>
    </Dialog>
  );
}
