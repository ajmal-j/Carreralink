"use client";

import { ZodObject } from "zod";
import { Input } from "@/components/ui/input";
import PrimaryButton from "../Buttons/PrimaryButton";
import { ReactNode, useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          ) : key === "currentStatus" || key === "place" ? (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof typeof defaultValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(field.name === "currentStatus"
                        ? ["student", "working", "job seeking", "freelancing"]
                        : [
                            "Eranakulam",
                            "Trivandrum ",
                            "Kozhikode",
                            "Kannur",
                            "Palakkad",
                            "Malappuram",
                            "Kottayam",
                            "Pathanamthitta",
                            "Alappuzha",
                            "Kollam",
                            "Thrissur",
                            "Idukki",
                            "Wayanad",
                            "Kasaragod",
                          ].map((place: string) =>
                            place.concat(" , ", "Kerala", " , ", "India"),
                          )
                      ).map((status: string, index: number) => (
                        <SelectItem
                          id={index.toString()}
                          key={index}
                          value={status}
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <FormLabel className="block capitalize">
                    {field.name}
                  </FormLabel>
                  <FormControl>
                    {field.name !== "startDate" && field.name !== "endDate" ? (
                      <Input
                        type={field.name === "contact" ? "number" : "text"}
                        placeholder={`enter your ${field.name}.`}
                        {...field}
                      />
                    ) : field.name === "endDate" &&
                      field.value === "Present" ? (
                      <div className="flex items-center gap-2">
                        <Input
                          disabled
                          type="text"
                          className="border border-gray-400"
                          placeholder={`enter your ${field.name}.`}
                          {...field}
                        />
                        <Button type="button" variant={"outline"}>
                          <CalendarIcon
                            onClick={() => field.onChange(new Date())}
                            className="ml-auto h-5 w-5 cursor-pointer opacity-50"
                          />
                        </Button>
                      </div>
                    ) : (
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                              {field.name === "endDate" && (
                                <Button
                                  type="button"
                                  variant={"outline"}
                                  onClick={() => field.onChange("Present")}
                                  className="ml-auto w-min cursor-pointer px-3"
                                >
                                  Present
                                </Button>
                              )}
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
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
        <div>
          <PrimaryButton type="submit" className="mt-6 py-2.5">
            {action || "submit"}
          </PrimaryButton>
        </div>
      </form>
    </Form>
  );
}
