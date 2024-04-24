"use client";

import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { createPlan } from "@/services/admin.service";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function NewPlan() {
  const { push } = useRouter();

  const defaultValues: IPlan = {
    name: "",
    price: 0,
    duration: 1,
    for: "user",
    plan: "basic",
    description: "",
  };

  const formSchema = z.object({
    name: z.string().min(3, { message: "Invalid name" }),
    price: z.number().min(10, { message: "Invalid price" }),
    duration: z.number().min(1, { message: "Invalid duration" }),
    for: z.string().nonempty({ message: "Required" }),
    plan: z.string().nonempty({ message: "Required" }),
    description: z.string().min(3, { message: "Invalid description" }),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createPlan(data as IPlan);
      toast({
        title: "Plan created successfully",
      });
      push("/dashboard/admin/plans");
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
      <h1 className="mt-5 text-center text-xl text-foreground/70 md:text-3xl">
        Post a new Plan
      </h1>
      <CustomForm
        defaultValues={defaultValues}
        formSchema={formSchema}
        onSubmit={onSubmit}
        action="create plan"
        className="mx-auto mb-10 mt-10 max-w-[700px]"
      />
    </div>
  );
}