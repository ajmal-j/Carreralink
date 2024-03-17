import { cn } from "@/lib/utils";
import PrimaryButton from "../Buttons/PrimaryButton";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Search({
  className,
  action,
}: {
  className?: string;
  action: string;
}) {
  return (
    <form
      action={action}
      className={cn(
        "mx-auto flex max-w-[400px] items-center justify-center",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between rounded-full bg-background px-2 py-[5px] font-montserrat shadow-roundedPrimaryShadow">
        <div className="flex flex-1 items-center">
          <MagnifyingGlassIcon className="ms-2 size-5" />
          <input
            placeholder="Search for jobs..."
            name="q"
            className="w-full bg-transparent px-2 py-2 outline-none ring-0 placeholder:text-sm"
          />
        </div>
        <PrimaryButton className="w-min px-6" type="submit">
          Search
        </PrimaryButton>
      </div>
    </form>
  );
}
