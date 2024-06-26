"use client";
import { cn } from "@/lib/utils";
import PrimaryButton from "../Buttons/PrimaryButton";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Search({
  className,
  action,
  state,
  onSubmit,
  placeholder,
  defaultValue,
  name,
}: {
  className?: string;
  state?: boolean;
  action?: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  onSubmit?: () => unknown;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (state) e.preventDefault();
        else return;
        onSubmit?.();
      }}
      className={cn(
        "mx-auto flex max-w-[400px] items-center justify-center rounded-full shadow-roundedPrimaryShadow",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between rounded-full bg-background px-2 py-[5px] font-montserrat ">
        <div className="flex flex-1 items-center">
          <MagnifyingGlassIcon className="ms-2 size-5" />
          <input
            placeholder={placeholder ? placeholder : "Search for jobs..."}
            name={name ?? "q"}
            defaultValue={defaultValue}
            className="w-full bg-transparent px-2 py-2  text-foreground/70 outline-none ring-0 placeholder:text-sm"
          />
        </div>
        <PrimaryButton className="w-min px-6" type="submit">
          Search
        </PrimaryButton>
      </div>
    </form>
  );
}
