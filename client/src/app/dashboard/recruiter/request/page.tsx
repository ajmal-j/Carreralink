"use client";

import { CustomForm } from "@/components/FormsAndDialog/CustomForm";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { createRequest } from "@/services/recruiter.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

export default function Request() {
  const { push } = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) push("/login");
  }, []);
  const onsubmit = async (values: Record<string, any>) => {
    try {
      await createRequest(values);
      toast({
        title: "Request Submitted",
        description: "We will get back to you soon",
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
  return (
    <div className="mx-auto flex min-h-screen w-full  max-w-[450px] flex-col items-center justify-center ">
      <h1 className="pb-7 ps-1 pt-10 text-2xl text-foreground/70">
        Application for Recruiter Position.
      </h1>
      <CustomForm
        className="w-full"
        onSubmit={onsubmit}
        defaultValues={{
          company: "",
          message: "",
        }}
        formSchema={z.object({
          company: z.string().min(1, "Please select company"),
          message: z.string().min(15, "A proper message is required"),
        })}
      />
    </div>
  );
}
