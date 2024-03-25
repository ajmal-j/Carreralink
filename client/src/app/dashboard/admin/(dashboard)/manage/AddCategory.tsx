"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { addSkills } from "@/services/user.service";
import { getMessage } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import AccentButton from "@/components/Buttons/AccentButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addCategories } from "@/services/admin.service";

const FormSchema = z.object({
  skills: z.array(z.string()),
});

export function AddCategory({
  defaultValues,
  setValue: { setCategories, setSelectedCategories },
}: {
  defaultValues: string[];
  setValue: {
    setCategories: Dispatch<SetStateAction<string[]>>;
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  };
}) {
  const categories: Set<string> = new Set(defaultValues);

  const [newCategory, setNewCategory] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  const ref = useRef<any>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      skills: [],
    },
  });
  const onSubmit = async (data: string[]) => {
    if (!data.length) return;
    try {
      await addCategories({ categories: data });
      toast({
        title: "Categories updated successfully",
      });
      setOpen(false);
      setCategories((data) => [...data, ...newCategory]);
      setSelectedCategories((data) => [...data, ...newCategory]);
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
          className={`ms-auto w-min px-3 dark:border-foreground/70 dark:shadow-roundedPrimaryShadow`}
        >
          <PlusIcon />
        </AccentButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Category</DialogTitle>
        </DialogHeader>

        <div className="mb-3 mt-4 flex flex-wrap gap-2 gap-y-3">
          {!newCategory.length && (
            <p className="ps-2 text-foreground/50">No Category selected</p>
          )}
          {newCategory.map((category: string, index: number) => (
            <div key={index} className="relative">
              <PrimaryButton className="w-min px-3">{category}</PrimaryButton>
              <span>
                <CrossCircledIcon
                  onClick={() =>
                    setNewCategory(newCategory.filter((_, i) => i !== index))
                  }
                  className="absolute right-[-5px] top-[-4px] size-5 cursor-pointer rounded-full bg-background text-red-500"
                />
              </span>
            </div>
          ))}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => onSubmit(newCategory))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem className="mb-3 flex items-center gap-2">
                  <Input
                    type="text"
                    className="mt-2"
                    placeholder="enter here"
                    value={input}
                    ref={ref}
                    onChange={(e) => {
                      const { value } = e.target as HTMLInputElement;
                      setInput(value);
                    }}
                    onKeyUp={(e) => {
                      let str = input.charAt(0).toUpperCase() + input.slice(1);
                      if (
                        categories.has(str) ||
                        categories.has(input.toLocaleLowerCase())
                      ) {
                        setIsValid(false);
                        return;
                      } else setIsValid(true);
                      if (!input) setIsValid(false);
                    }}
                  />
                  <Button
                    type="button"
                    disabled={!isValid || !input}
                    variant={"outline"}
                    className="h-12"
                    onClick={() => {
                      if (!input) return;
                      if (input.length < 3) {
                        toast({
                          title: "Category name must be at least 3 characters",
                          variant: "destructive",
                          duration: 2000,
                        });
                        return;
                      }
                      setNewCategory([...newCategory, input]);
                      setInput("");
                      ref?.current?.focus();
                    }}
                  >
                    Add
                  </Button>
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
