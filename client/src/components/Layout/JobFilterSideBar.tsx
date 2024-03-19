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

const jobTypes = ["Full-time", "Part-time", "Internship"];
const locations = [
  "Cupertino, California, United States",
  "Mountain View, California, United States",
  "San Francisco, California, United States",
  "Palo Alto, California, United States",
];

interface PageProps {
  defaultValues?: {
    q?: string;
    type?: string;
    location?: string;
  };
  className?: string;
}
export default function JobFilterSideBar({
  className,
  defaultValues,
}: PageProps) {
  return (
    <aside>
      <form action="" className={cn("mt-6", className)}>
        <div className="space-y-5">
          <div className="flex flex-col gap-3">
            <Label htmlFor="q" className="ps-1">
              Search job titles or companies
            </Label>
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
                  {jobTypes.map((type, idx) => (
                    <SelectItem key={idx} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="location" className="ps-1">
              Location
            </Label>
            <Select name="location" defaultValue={defaultValues?.location}>
              <SelectTrigger name="location" className="w-full">
                <SelectValue id="location" placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {locations.map((location, idx) => (
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
          <PrimaryButton type="submit">Apply Filters</PrimaryButton>
        </div>
      </form>
    </aside>
  );
}
