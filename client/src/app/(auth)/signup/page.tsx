"use client";
import { CustomForm } from "@/components/Utils/CusotomForm";
import Title from "@/components/Utils/Title";
import Wrapper from "@/components/Utils/Wrapper";
import Link from "next/link";
import React from "react";
import { z } from "zod";

export default function Login() {
  const formSchema = z
    .object({
      email: z.string().email("invalid email"),
      username: z.string().min(4, "username must be at least 4 characters"),
      contact: z.string().min(10, "invalid number").max(12, "invalid number"),
      password: z.string().min(8, "password must be at least 8 characters"),
      confirmPassword: z
        .string()
        .min(8, "password must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const defaultValues: z.infer<typeof formSchema> = {
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  };

  const onsubmit = (values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(values));
  };

  return (
    <Wrapper className="flex items-center justify-center">
      <div className="flex w-full max-w-[800px] flex-col items-center justify-center rounded-3xl py-32 dark:bg-black/30">
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
  );
}
