"use client";

import { ZodObject } from "zod";
import { Input } from "@/components/ui/input";
import PrimaryButton from "../Buttons/PrimaryButton";
import React, { ReactNode, useState } from "react";
import { Cross1Icon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
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
import {
  UseFormReturn,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from "react-hook-form";
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
import LocationInput from "@/components/Custom/LocationInput";
import TextEditor from "@/components/Custom/TextEditor";
import { draftToMarkdown } from "markdown-draft-js";

type FormType = {
  formSchema: ZodObject<Record<string, any>>;
  defaultValues: Record<string, any>;
  onSubmit: (values: any) => void;
  comment?: ReactNode;
  action?: string;
  className?: string;
};

export function CustomForm({
  formSchema,
  defaultValues,
  onSubmit,
  comment,
  action,
  className,
}: FormType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { watch, setValue, setFocus } = form;
  return (
    <div className={cn(className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {Object.keys(defaultValues).map((key) => {
            switch (key) {
              case "password":
              case "confirmPassword":
                return (
                  <PasswordComponent
                    key={key}
                    name={key as keyof typeof defaultValues}
                    form={form}
                  />
                );

              case "currentStatus":
              case "industry":
                return <CustomSelectField key={key} name={key} form={form} />;

              case "place":
              case "location":
              case "headquarters":
                return (
                  <LocationField
                    key={key}
                    name={key}
                    form={form}
                    watch={watch}
                    setValue={setValue}
                  />
                );

              case "logo":
              case "imageOfCEO":
                return <ImageComponent key={key} name={key} form={form} />;

              case "description":
                return (
                  <DescriptionField
                    key={key}
                    name={key}
                    setFocus={setFocus}
                    form={form}
                  />
                );
              default:
                return <DefaultComponent key={key} name={key} form={form} />;
            }
          })}
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
    </div>
  );
}

interface IFormProps {
  name: string;
  form: UseFormReturn<
    {
      [x: string]: any;
    },
    any,
    undefined
  >;
}
function PasswordComponent({ name, form }: IFormProps) {
  const [password, setPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{field.name}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={password ? "text" : "password"}
                placeholder={`enter ${field.name}.`}
                {...field}
              />
              <button
                className="absolute right-2 top-3"
                type="button"
                onClick={() => setPassword(!password)}
              >
                {password ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function CustomSelectField({ name, form }: IFormProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{field.name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`select ${field.name}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {(field.name === "currentStatus"
                ? ["student", "working", "job seeking", "freelancing"]
                : field.name === "place"
                  ? [
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
                  : ["Software", "Technology", "Products", "Other"]
              ).map((status: string, index: number) => (
                <SelectItem id={index.toString()} key={index} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

function DefaultComponent({ name, form }: IFormProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block capitalize">{field.name}</FormLabel>
          <FormControl>
            {field.name !== "startDate" && field.name !== "endDate" ? (
              <Input
                type={
                  field.name === "contact" ||
                  field.name === "foundedOn" ||
                  field.name === "revenue"
                    ? "number"
                    : "text"
                }
                placeholder={`enter ${field.name}.`}
                {...field}
              />
            ) : field.name === "endDate" && field.value === "Present" ? (
              <div className="flex items-center gap-2">
                <Input
                  disabled
                  type="text"
                  className="border border-gray-400"
                  placeholder={`enter ${field.name}.`}
                  {...field}
                />
                <Button type="button" variant={"outline"}>
                  <CalendarIcon
                    onClick={() => field.onChange(new Date().toDateString())}
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
  );
}

function ImageComponent({ form, name }: IFormProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, name, ...fieldValues } }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <Input
              ref={fieldValues.ref}
              onBlur={fieldValues.onBlur}
              disabled={fieldValues.disabled}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                fieldValues.onChange(file);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface ILocationInputProps extends IFormProps {
  watch: UseFormWatch<z.infer<any>>;
  setValue: UseFormSetValue<z.infer<any>>;
}
function LocationField({ form, name, watch, setValue }: ILocationInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <LocationInput
              onLocationSelected={field.onChange}
              ref={field.ref}
            />
          </FormControl>
          {watch(name) && (
            <div className="flex items-center gap-1 ps-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setValue(name, "", { shouldValidate: true });
                }}
              >
                <Cross1Icon className="size-5" />
              </button>
              <span className="text-sm">{watch(name)}</span>
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

interface IDescriptionFieldProps extends IFormProps {
  setFocus: UseFormSetFocus<{
    [x: string]: any;
  }>;
}

function DescriptionField({ form, name, setFocus }: IDescriptionFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel onClick={() => setFocus(name)}>Description</FormLabel>
          <FormControl>
            <TextEditor
              onChange={(draft) => field.onChange(draftToMarkdown(draft))}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
