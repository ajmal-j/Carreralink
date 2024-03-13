"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodObject, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PrimaryButton from "./PrimaryButton";
import { ReactNode, useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

type FormType = {
  formSchema: ZodObject<Record<string, any>>;
  defaultValues: Record<string, any>;
  onSubmit: (values: any) => void;
  comment?: ReactNode;
  action?: string;
};

export function CustomForm({
  formSchema,
  defaultValues,
  onSubmit,
  comment,
  action,
}: FormType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const [password, showPassword] = useState<boolean>(false);
  const [confirmPassword, showConfirmPassword] = useState<boolean>(false);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(defaultValues).map((key) =>
          key === "password" || key === "confirmPassword" ? (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof typeof defaultValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          (key === "password" ? password : confirmPassword)
                            ? "text"
                            : "password"
                        }
                        placeholder={`enter your ${field.name}.`}
                        {...field}
                      />
                      <button
                        className="absolute right-2 top-3"
                        type="button"
                        onClick={() =>
                          (key === "password"
                            ? showPassword
                            : showConfirmPassword)(
                            !(key === "password" ? password : confirmPassword),
                          )
                        }
                      >
                        {(key === "password" ? password : confirmPassword) ? (
                          <EyeClosedIcon />
                        ) : (
                          <EyeOpenIcon />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof typeof defaultValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      type={field.name === "contact" ? "number" : "text"}
                      placeholder={`enter your ${field.name}.`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ),
        )}
        {comment && (
          <div>
            <p className="text-center text-sm">{comment}</p>
          </div>
        )}
        <PrimaryButton type="submit" className="py-2.5">
          {action || "submit"}
        </PrimaryButton>
      </form>
    </Form>
  );
}
