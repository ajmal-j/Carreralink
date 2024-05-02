"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { languageVersions } from "@/constants";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CommandList } from "cmdk";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const languages = Object.entries(languageVersions).map(([key]) => ({
  value: key,
  label: key,
}));

export default function CodeSelector({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span className="capitalize">
            {language
              ? languages.find((framework) => framework.value === language)
                  ?.label
              : "Select framework..."}
          </span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {languages.map((framework) => (
                <CommandItem
                  className="cursor-pointer"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setLanguage(currentValue === language ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <span className="capitalize">{framework.label}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      language === framework.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
