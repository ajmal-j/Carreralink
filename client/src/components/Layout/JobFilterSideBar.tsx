import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PrimaryButton from "../Buttons/PrimaryButton";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAllLocations } from "@/services/jobs.service";

interface PageProps {
  defaultValues?: {
    q?: string;
    type?: string;
    location?: string;
    sort?: string;
  };
  className?: string;
  path: string;
}

const sortingOptions = [
  "most recent",
  "least applied",
  "most applied",
  "highest paying",
  "lowest paying",
];

const filterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  sort: z.string().optional(),
});

async function filterJobs(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());
  const { q, type, location, sort } = filterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(sort && { sort }),
  });
  redirect(`${values?.path}?${searchParams.toString()}`);
}

export default async function JobFilterSideBar({
  className,
  defaultValues,
  path,
}: PageProps) {
  let distinctLocationsTypes = [];
  let distinctLocations = [];

  try {
    const res = await getAllLocations();
    const { officeLocations, locations } = res.data;
    distinctLocationsTypes = locations;
    distinctLocations = officeLocations;
  } catch (error) {
    console.log(error);
  }

  return (
    <aside>
      <form action={filterJobs} className={cn("mt-6", className)}>
        <div className="space-y-5">
          <div className="flex flex-col gap-3">
            <Label htmlFor="q" className="ps-1">
              Search job titles or companies
            </Label>
            <input type="hidden" name="path" value={path} />
            <Input
              type="text"
              name="q"
              id="q"
              defaultValue={defaultValues?.q}
              placeholder="Product designer,Google..."
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="type" className="ps-1">
              Job Type
            </Label>
            <Select name="type" defaultValue={defaultValues?.type}>
              <SelectTrigger name="type" className="w-full">
                <SelectValue id="type" placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {distinctLocationsTypes.map((type: string, idx: number) => (
                    <SelectItem key={idx} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-2 flex flex-col gap-3">
            <Label htmlFor="location" className="ps-1">
              Location
            </Label>
            <Select name="location" defaultValue={defaultValues?.location}>
              <SelectTrigger name="location" className="w-full">
                <SelectValue id="location" placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {distinctLocations.map((location: string, idx: number) => (
                    <SelectItem
                      key={idx}
                      value={location}
                      className="capitalize"
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-2 flex flex-col gap-3">
            <Label htmlFor="sort" className="ps-1">
              Sort By
            </Label>
            <Select
              name="sort"
              defaultValue={defaultValues?.sort || "most recent"}
            >
              <SelectTrigger name="sort" className="w-full">
                <SelectValue id="sort" placeholder="Select a sort option." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortingOptions.map((option: string, idx: number) => (
                    <SelectItem key={idx} value={option} className="capitalize">
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <PrimaryButton type="submit">Apply Filters</PrimaryButton>
        </div>
      </form>
    </aside>
  );
}
