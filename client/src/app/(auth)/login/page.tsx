"use client";

import { CustomForm } from "@/components/FormsAndDialog/CusotomForm";
import Title from "@/components/Custom/Title";
import Wrapper from "@/components/Custom/Wrapper";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { getMessage } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { LogInAction } from "./actions";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleLogin } from "@/services/user.service";

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
      router.push("/");
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };
  const signInWithGoogle = async ({
    credential,
  }: {
    credential: {
      email: string;
      name: string;
      picture: string;
    };
  }) => {
    try {
      const response = await googleLogin(credential);
      toast({
        title: "LogIn successful",
        duration: 2000,
      });
      localStorage.setItem("userToken", response.data?.token);
      router.push("/");
    } catch (error) {
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
      console.log(error);
    }
  };
  return (
    <div className="bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat">
      <Wrapper className="flex items-center justify-center backdrop-blur-[160px]">
        <div className="flex w-full max-w-[800px] flex-col items-center justify-center rounded-3xl bg-background px-3 py-32">
          <div className="w-full max-w-[370px]">
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
          <div className="z-20 mt-5 flex h-14 w-full max-w-[370px] items-center justify-center rounded-full bg-white">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (!credentialResponse?.credential) return alert("error");
                const decoded = jwtDecode(credentialResponse?.credential);
                const { email, name, picture }: any = decoded;
                signInWithGoogle({ credential: { email, name, picture } });
              }}
              onError={() => {
                alert("error");
              }}
              text="continue_with"
              shape="pill"
              logo_alignment="center"
              locale="en"
              useOneTap={true}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
