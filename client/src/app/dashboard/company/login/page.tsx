"use client";

import { CustomForm } from "@/components/FormsAndDialog/CusotomForm";
import Title from "@/components/Custom/Title";
import Wrapper from "@/components/Custom/Wrapper";
import React from "react";
import { z } from "zod";
import { getMessage } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { LogInAction } from "./actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export default function Login() {
  const router = useRouter();
  const defaultValues: z.infer<typeof formSchema> = {
    email: "",
    password: "",
  };

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await LogInAction(values);
      toast({
        title: "LogIn successful",
        duration: 2000,
      });
      router.push("/dashboard/company/");
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
    <div className="bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat">
      <Wrapper className="flex items-center justify-center backdrop-blur-[160px]">
        <div className="flex w-full max-w-[800px] flex-col items-center justify-center rounded-3xl bg-background py-32">
          <div className="w-full max-w-[370px] px-3">
            <Title className="pb-10" />
            <CustomForm
              formSchema={formSchema}
              defaultValues={defaultValues}
              onSubmit={onsubmit}
              action="Login to dashboard"
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
