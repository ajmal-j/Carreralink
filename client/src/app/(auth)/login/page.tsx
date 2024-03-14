"use client";
import { CustomForm } from "@/components/Utils/CusotomForm";
import Title from "@/components/Utils/Title";
import Wrapper from "@/components/Utils/Wrapper";
import Link from "next/link";
import React from "react";
import { z } from "zod";

export default function Login() {
  const formSchema = z.object({
    email: z.string().email("invalid email"),
    password: z.string().min(8, "password must be at least 8 characters"),
  });

  const defaultValues: z.infer<typeof formSchema> = {
    email: "",
    password: "",
  };

  const onsubmit = (values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(values));
  };

  return (
    <Wrapper className="flex items-center justify-center">
      <div className="flex w-full max-w-[800px] flex-col items-center justify-center rounded-3xl py-32 dark:bg-black/40">
        <div className="w-full max-w-[370px] px-3">
          <Title className="pb-10" />
          <CustomForm
            formSchema={formSchema}
            defaultValues={defaultValues}
            onSubmit={onsubmit}
            action="Login"
            comment={
              <>
                <span className="text-foreground/70">
                  Don&apos;t you have an account?{" "}
                </span>
                <Link className="underline" href={"/signup"}>
                  Signup
                </Link>
              </>
            }
          />
        </div>
      </div>
    </Wrapper>
  );
}