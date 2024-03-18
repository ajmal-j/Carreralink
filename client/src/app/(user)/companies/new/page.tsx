"use client";
import { CustomForm } from "@/components/FormsAndDialog/CusotomForm";
import React from "react";
import { z } from "zod";

export default function New() {
  const defaultValues = {
    name: "",
    website: "",
    tagline: "",
    industry: "",
    ceo: "",
    foundedOn: "",
    logo: undefined,
    imageOfCEO: undefined,
    revenue: "",
    headquarters: "",
    size: "",
    email: "",
    password: "",
    confirmPassword: "",
    description: "",
  };
  const formSchema = z
    .object({
      name: z
        .string()
        .min(5, "Company name must be at least 5 characters long"),
      website: z.string().url("Invalid URL"),
      tagline: z
        .string()
        .min(10, "Company tagline must be at least 10 characters long"),
      industry: z.enum(["Software", "Technology", "Products", "Other"], {
        errorMap: () => ({ message: "Please select an industry" }),
      }),
      foundedOn: z
        .string()
        .min(4, "Invalid year")
        .refine(
          (data) =>
            Number(data) > 1000 && Number(data) < new Date().getFullYear() + 1,
          {
            message: "Invalid year",
            path: ["foundedOn"],
          },
        ),
      logo: z
        .custom<File | undefined>()
        .refine(
          (file) =>
            !file || (file instanceof File && file.type.startsWith("image/")),
          {
            message: "File must be an image",
            path: ["logo"],
          },
        ),

      imageOfCEO: z.custom<File | undefined>().refine(
        (file) => {
          return !file || file?.size < 1024 * 1024 * 2;
        },
        {
          message: "File size must be less than 2MB",
          path: ["logo"],
        },
      ),
      revenue: z
        .string()
        .min(1, "Invalid revenue")
        .refine((data) => Number(data) > 0, {
          message: "Invalid revenue",
          path: ["revenue"],
        }),
      headquarters: z.string().min(5, "Invalid headquarters"),
      size: z
        .string()
        .min(1, "Invalid size")
        .refine((data) => Number(data) > 0, {
          message: "Invalid size",
          path: ["size"],
        }),
      email: z.string().email("Invalid email"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      ceo: z.string().min(3, "Invalid input"),
      description: z
        .string()
        .min(10, "Company description must be at least 10 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };
  return (
    <div>
      <h1 className="mt-5 ps-2 text-xl text-foreground/70 md:text-3xl">
        Register your company
      </h1>
      <CustomForm
        className="mx-auto mt-10 max-w-[700px]"
        defaultValues={defaultValues}
        // @ts-ignore
        formSchema={formSchema}
        onSubmit={onSubmit}
        action="Register"
      />
    </div>
  );
}
