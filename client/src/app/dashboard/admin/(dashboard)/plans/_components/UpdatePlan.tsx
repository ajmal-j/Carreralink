"use client";

import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { updatePlan } from "@/services/admin.service";
import { Pencil } from "lucide-react";
import { markdownToDraft } from "markdown-draft-js";
import { Dispatch, SetStateAction, useState } from "react";
import { RawDraftContentState } from "react-draft-wysiwyg";
import { z } from "zod";

export default function UpdatePlan({
  plan,
  setUserPlans,
  setCompanyPlans,
}: {
  plan: IPlan;
  setUserPlans: Dispatch<SetStateAction<IPlan[]>>;
  setCompanyPlans: Dispatch<SetStateAction<IPlan[]>>;
}) {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    name: z.string().min(3, { message: "Invalid name" }),
    price: z.number().min(10, { message: "Invalid price" }),
    duration: z.number().min(1, { message: "Invalid duration" }),
    for: z.enum(["user", "company"]),
    plan: z.enum(["basic", "premium"]),
    description: z.string().min(3, { message: "Invalid description" }),
    features: z.array(z.string().nonempty({ message: "Required" })),
  });
  const featureArray = Object.keys(plan?.features ?? {});
  const value = formSchema.parse({
    ...plan,
    features: featureArray,
  });

  const { description, ...rest } = value;
  const id = plan.id;

  const defaultValues: Omit<IPlan, "id" | "description"> & {
    description: RawDraftContentState;
  } = {
    ...rest,
    description: markdownToDraft(description),
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { features, ...rest } = data;
      const newFeatures: Record<string, boolean> = {};
      for (const feature of features) {
        newFeatures[feature] = true;
      }
      const plan = {
        ...rest,
        features: newFeatures,
      };
      const response = await updatePlan({ ...(plan as Omit<IPlan, "id">), id });
      toast({
        title: "Plan updated successfully",
      });
      const updated = response.data;

      setOpen(false);
      if (updated.for === "user") {
        setUserPlans((data) => [...data.filter((d) => d.id !== id), updated]);
        setCompanyPlans((data) => data.filter((d) => d.id !== id));
      } else if (updated.for === "company") {
        setCompanyPlans((data) => [
          ...data.filter((d) => d.id !== id),
          updated,
        ]);
        setUserPlans((data) => data.filter((d) => d.id !== id));
      }
    } catch (error) {
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
        duration: 500,
      });
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer p-1">
            <Pencil className="size-4" />
          </div>
        </DialogTrigger>
        <DialogContent className="mt-1 h-full overflow-y-scroll pt-10 sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="pb-3 text-xl text-foreground/70">
              Update Plan
            </DialogTitle>
          </DialogHeader>
          <CustomForm
            defaultValues={defaultValues}
            formSchema={formSchema}
            onSubmit={onSubmit}
            action="update plan"
            className="mx-auto mb-10 mt-10 max-w-[700px]"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
