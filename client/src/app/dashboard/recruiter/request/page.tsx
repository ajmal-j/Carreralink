"use client";
import { CustomForm } from "@/components/FormsAndDialog/CusotomForm";
import { z } from "zod";

export default function Request() {
  return (
    <div className="mx-auto flex min-h-screen w-full  max-w-[450px] flex-col items-center justify-center ">
      <h1 className="pb-7 ps-1 pt-10 text-2xl text-foreground/70">
        Application for Recruiter Position
      </h1>
      <CustomForm
        className="w-full"
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
        defaultValues={{
          company: "",
          name: "",
          message: "",
        }}
        formSchema={z.object({
          company: z.string().min(1, "Please select company"),
          name: z.string().min(3, "Name is required"),
          message: z.string().min(15, "A proper message is required"),
        })}
      />
    </div>
  );
}
