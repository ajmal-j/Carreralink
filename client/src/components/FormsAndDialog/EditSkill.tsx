"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PrimaryButton from "../Buttons/PrimaryButton";
import { CrossCircledIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  skills: z.array(z.string()),
});

export function EditSkill({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues: string[];
}) {
  const [skills, setSkills] = useState<string[]>(defaultValues || []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      skills: [],
    },
  });
  const onSubmit = (data: string[]) => {
    alert(JSON.stringify(data));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Skills</DialogTitle>
        </DialogHeader>

        <div className="mb-3 mt-4 flex flex-wrap gap-2 gap-y-3">
          {!skills.length && (
            <p className="text-foreground/50">No skills selected</p>
          )}
          {skills.map((skill: string, index: number) => (
            <div key={index} className="relative">
              <PrimaryButton className="w-min px-3">{skill}</PrimaryButton>
              <span>
                <CrossCircledIcon
                  onClick={() =>
                    setSkills(skills.filter((_, i) => i !== index))
                  }
                  className="absolute right-[-5px] top-[-4px] size-5 cursor-pointer rounded-full bg-background text-red-500"
                />
              </span>
            </div>
          ))}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => onSubmit(skills))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <Select
                    onValueChange={(skill) => {
                      if (!skills.includes(skill)) {
                        setSkills((prev) => [...prev, skill]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="placeholder:text-foreground/50"
                          placeholder="Select skills."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "JavaScript",
                        "Node.js",
                        "React",
                        "MongoDB",
                        "Python",
                        "Java",
                        "C++",
                      ].map((skill: string, index: number) => (
                        <SelectItem
                          className="w-full"
                          id={index.toString()}
                          key={index}
                          value={skill}
                        >
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div>
              <PrimaryButton type="submit" className="mt-3">
                submit
              </PrimaryButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
