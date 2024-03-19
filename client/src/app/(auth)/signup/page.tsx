"use client";

import { CustomForm } from "@/components/FormsAndDialog/CusotomForm";
import Title from "@/components/Custom/Title";
import Wrapper from "@/components/Custom/Wrapper";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { SignUp } from "./actions";
import { getMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z.string().email("invalid email"),
    username: z.string().min(4, "username must be at least 4 characters"),
    contact: z
      .string()
      .refine((contact) => /^[6-9]\d{9}$/.test(String(contact)), {
        message: "Invalid contact number",
      }),
    password: z.string().min(8, "password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof formSchema>;
export default function Login() {
  const router = useRouter();

  const defaultValues: z.infer<typeof formSchema> = {
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  };

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await SignUp({
        contact: Number(values.contact),
        email: values.email,
        password: values.password,
        username: values.username,
      });
      toast({
        title: "Account created",
        description: "Please LogIn.",
        duration: 2000,
      });
      router.push("/login");
    } catch (error) {
      const message = getMessage(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: message,
        variant: "destructive",
        duration: 3000,
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
              //@ts-ignore
              formSchema={formSchema}
              defaultValues={defaultValues}
              onSubmit={onsubmit}
              action="Login"
              comment={
                <>
                  <span className="text-foreground/70">
                    Do you have an account?{" "}
                  </span>
                  <Link className="underline" href={"/login"}>
                    LogIn
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
