"use client";

import Title from "@/components/Custom/Title";
import React from "react";
import { z } from "zod";
import { getMessage } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import MainText from "@/components/Layout/MainText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resentOtp, verifyUser } from "@/services/user.service";
import BackButton from "@/components/Buttons/BackButton";

const formSchema = z.object({
  email: z.string().email("invalid email"),
  otp: z.string().min(6, "otp must be at least 6 characters"),
});

export default function Login() {
  const router = useRouter();
  const emailParam = useSearchParams().get("email") || "";
  const defaultValues: z.infer<typeof formSchema> = {
    email: emailParam,
    otp: "",
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await verifyUser(values);
      toast({
        title: "Verification successful",
        description: "Please login",
        duration: 2000,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const sendOtp = async (email: string) => {
    try {
      if (!email) {
        toast({
          title: "Email is required",
          description: "Please provide an email",
          variant: "destructive",
        });
        return;
      }
      await resentOtp({ email: email });
      toast({
        title: "OTP resented",
        description: "Please check your email",
        duration: 2000,
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
    <div className="flex min-h-screen justify-stretch bg-cover bg-center bg-no-repeat">
      <div className="hidden w-full max-w-[600px] items-center justify-center rounded-r-3xl bg-primaryColor2 p-10 md:flex">
        <div className="flex h-full max-h-[500px] w-full flex-col items-center justify-center">
          <Title className="ms-[-10px]" height={80} width={200} />
          <MainText text="Experience Effortless Job Matching!" />
        </div>
      </div>
      <div className="me-auto flex w-full min-w-[350px] flex-col items-center justify-center rounded-3xl bg-background  px-3 py-32">
        <span className="hidden pb-6 text-2xl font-semibold text-foreground/90 md:inline-block">
          Verify Otp
        </span>
        <Title className="block pb-10 md:hidden" />
        <div className="w-full max-w-[370px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={emailParam ? true : false}
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} className="w-full">
                        <InputOTPGroup className="flex w-full">
                          <InputOTPSlot className="w-full" index={0} />
                          <InputOTPSlot className="w-full" index={1} />
                          <InputOTPSlot className="w-full" index={2} />
                          <InputOTPSlot className="w-full" index={3} />
                          <InputOTPSlot className="w-full" index={4} />
                          <InputOTPSlot className="w-full" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="pb-6">
                      Please enter the one-time password sent to your email. And
                      the otp will be valid for only{" "}
                      <span className="font-semibold text-foreground">
                        5 minutes.
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PrimaryButton type="submit">Verify</PrimaryButton>
              <div className="flex">
                <BackButton className="rounded-e-none border-r-0" />
                <Button
                  onClick={() => sendOtp(emailParam)}
                  variant={"outline"}
                  type="button"
                  className="w-full justify-start rounded-s-none ps-5 text-foreground/70"
                >
                  Resend otp
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
