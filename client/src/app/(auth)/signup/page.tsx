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
    <div className="bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat">
      <Wrapper className="flex items-center justify-center backdrop-blur-[160px]">
        <div className="flex w-full max-w-[800px] flex-col items-center justify-center rounded-3xl py-32 bg-background">
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
