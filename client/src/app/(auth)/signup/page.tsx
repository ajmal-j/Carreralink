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
import MainText from "@/components/Layout/MainText";

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
        description: "Please verify your account",
        duration: 2000,
      });
      router.push(`/verify?email=${values.email}`);
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
    <div className="flex min-h-screen justify-stretch bg-cover bg-center bg-no-repeat">
      <div className="hidden w-full max-w-[600px] items-center justify-center rounded-r-3xl bg-primaryColor p-10 md:flex">
        <div className="flex h-full max-h-[500px] w-full flex-col items-center justify-center">
          <Title className="ms-[-10px]" height={80} width={200} />
          <MainText text="Navigate Your Path to Professional Growth!" />
        </div>
      </div>
      <div className="me-auto flex w-full min-w-[350px] flex-col items-center justify-center rounded-3xl bg-background  px-3 py-32">
        <div className="w-full max-w-[370px] px-3">
          <span className="hidden w-full pb-6 text-center text-2xl font-semibold text-foreground/90 md:inline-block">
            Sign Up
          </span>
          <Title className="block pb-10 md:hidden" />
          <CustomForm
            //@ts-ignore
            formSchema={formSchema}
            defaultValues={defaultValues}
            onSubmit={onsubmit}
            action="Sign Up"
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
    </div>
  );
}
