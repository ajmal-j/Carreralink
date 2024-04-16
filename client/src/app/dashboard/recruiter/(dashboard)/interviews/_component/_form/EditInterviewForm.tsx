"use client";

import { CustomForm } from "@/components/FormsAndDialog/CusotomForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
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
}: {
  defaultValues: IInterview;
}) {
  const [open, setOpen] = useState(false);

  const onSubmit = async (values: IInterview) => {
    try {
      alert(JSON.stringify(values));
      toast({
        title: "Interview edited successfully",
      });
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  const formSchema = z.object({
    startDate: z.date().refine((date) => date >= new Date(), {
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
          defaultValues={defaultValues}
          formSchema={formSchema}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
