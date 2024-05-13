"use client";

import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { AddSkill } from "./AddSkills";
import { AddCategory } from "./AddCategory";
import { toast } from "@/components/ui/use-toast";
import { removeCategory, removeSkill } from "@/services/admin.service";
import { getSkillsAndCategories } from "@/services/admin.service";

export default function Mange() {
  const [skills, setSkills] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getSkillsAndCategories();
        const data = response?.data[0];
        const skills = data?.skills || [];
        const category = data?.category || [];
        setSkills(skills);
        setCategories(category);
        setSelectedSkills(skills);
        setSelectedCategories(category);
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
        console.log(error);
      }
    })();
  }, []);
  return (
    <DashboardWrapper title="Skill's and Category Management">
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="flex">
          <TabsTrigger value="skills" className="flex-grow">
            Skill&apos;s
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex-grow">
            categorie&apos;s
          </TabsTrigger>
        </TabsList>
        <TabsContent value="skills" className="flex flex-col gap-2">
          <div className="pt-2">
            <Input
              placeholder="Search skills..."
              className="mb-3 ring-0 focus-visible:ring-0"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                setSelectedSkills((selected: string[]) =>
                  selected.filter((skill) =>
                    skill.toLowerCase().startsWith(value.toLocaleLowerCase()),
                  ),
                );
              }}
              onKeyUp={(e) => {
                const { value } = e.target as HTMLInputElement;
                if (value === "") setSelectedSkills(skills);
              }}
            />
            <div className="mt-2 flex">
              <AddSkill
                setValue={{ setSkills, setSelectedSkills }}
                defaultValues={skills}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {selectedSkills?.map((skill) => (
              <div key={skill} className="group relative">
                <Button variant={"outline"}>{skill}</Button>
                <Popover>
                  <PopoverTrigger>
                    <CrossCircledIcon className="absolute right-[-4px] top-[-4px] hidden size-5 cursor-pointer rounded-full  bg-background text-red-500 group-hover:block" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="flex flex-col gap-2">
                    <Label>Are you sure you want to remove this skill?</Label>
                    <div className="ms-auto space-x-1">
                      <Button
                        onClick={async () => {
                          try {
                            await removeSkill({ skill });
                            setSkills((prev) =>
                              prev.filter((s) => s !== skill),
                            );
                            setSelectedSkills((prev) =>
                              prev.filter((s) => s !== skill),
                            );
                            toast({
                              title: "Skill removed successfully",
                            });
                          } catch (error) {
                            console.log(error);
                            toast({
                              title: "Something went wrong",
                              description: "Please try again",
                              variant: "destructive",
                            });
                          }
                        }}
                        size={"sm"}
                        className="bg-red-500/20 text-red-500 hover:bg-red-500/50 hover:text-white"
                      >
                        confirm
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
            {!!!selectedSkills?.length && (
              <span className="ps-2 text-foreground/50">No skills.</span>
            )}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="flex flex-col gap-2">
          <div>
            <Input
              placeholder="Search categories..."
              className="mb-3 ring-0 focus-visible:ring-0"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                setSelectedCategories((selected: string[]) =>
                  selected?.filter((category) =>
                    category
                      .toLowerCase()
                      .startsWith(value.toLocaleLowerCase()),
                  ),
                );
              }}
              onKeyUp={(e) => {
                const { value } = e.target as HTMLInputElement;
                if (value === "") setSelectedCategories(categories);
              }}
            />
            <div className="mt-2 flex">
              <AddCategory
                setValue={{ setCategories, setSelectedCategories }}
                defaultValues={categories}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {selectedCategories?.map((category) => (
              <div key={category} className="group relative">
                <Button variant={"outline"} className="capitalize">
                  {category}
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <CrossCircledIcon className="absolute right-[-4px] top-[-4px] hidden size-5 cursor-pointer rounded-full  bg-background text-red-500 group-hover:block" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="flex flex-col gap-2">
                    <Label>
                      Are you sure you want to remove this category?
                    </Label>
                    <div className="ms-auto space-x-1">
                      <Button
                        onClick={async () => {
                          try {
                            await removeCategory({ category });
                            setCategories((prev) =>
                              prev.filter((s) => s !== category),
                            );
                            setSelectedCategories((prev) =>
                              prev.filter((s) => s !== category),
                            );
                            toast({
                              title: "Category removed successfully",
                            });
                          } catch (error) {
                            console.log(error);
                            toast({
                              title: "Something went wrong",
                              description: "Please try again",
                              variant: "destructive",
                            });
                          }
                        }}
                        size={"sm"}
                        className="bg-red-500/20 text-red-500 hover:bg-red-500/50 hover:text-white"
                      >
                        confirm
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
            {!!!selectedCategories?.length && (
              <span className="ps-2 text-foreground/50">No categories.</span>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardWrapper>
  );
}
