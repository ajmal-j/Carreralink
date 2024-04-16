"use client";

import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

interface IInterview {
  startDate: Date;
  time: string;
  agenda: string;
}

export function EditInterviewForm({
  defaultValues,
  formAction,
  id,
}: {
  defaultValues: IInterview;
  id?: string;
  formAction?: (values: any, id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  let dateToCheck = new Date();
  dateToCheck.setDate(dateToCheck.getDate() - 1);
  const formSchema = z.object({
    startDate: z.date().refine((date) => date >= dateToCheck, {
      message: "Start date must be in the future",
    }),
    time: z.string().min(2, "Required"),
    agenda: z.string(),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-2 w-full">
        <Button className="flex w-full gap-1" size={"sm"}>
          <span>Edit</span> <PencilLine size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Interview</DialogTitle>
        </DialogHeader>
        <CustomForm
          onSubmit={(values) => {
            console.log(values);
          }}
          id={id}
          defaultValues={defaultValues}
          formSchema={formSchema}
          setOpen={setOpen}
          formAction={formAction}
        />
      </DialogContent>
    </Dialog>
  );
}
