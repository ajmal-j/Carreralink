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
import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { addSkills } from "@/services/user.service";
import { useDispatch } from "react-redux";
import { toast } from "../ui/use-toast";
import { getMessage } from "@/lib/utils";
import { addSkillsState } from "@/store/reducers/user.slice";
import AccentButton from "../Buttons/AccentButton";

const FormSchema = z.object({
  skills: z.array(z.string()),
});

export function EditSkill({ defaultValues }: { defaultValues: string[] }) {
  const [skills, setSkills] = useState<string[]>(defaultValues || []);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      skills: [],
    },
  });
  const onSubmit = async (data: string[]) => {
    try {
      await addSkills(data);
      toast({
        title: "Skills updated successfully",
      });
      dispatch(addSkillsState(data));
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AccentButton
          onClick={() => setOpen(true)}
          className={`${skills.length ? "ms-2" : "ms-auto"} w-min px-3 dark:border-foreground/70 dark:shadow-roundedPrimaryShadow`}
        >
          <PlusIcon />
        </AccentButton>
      </DialogTrigger>
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
                      ]
                        .filter((skill) => !skills.includes(skill))
                        .map((skill: string, index: number) => (
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
