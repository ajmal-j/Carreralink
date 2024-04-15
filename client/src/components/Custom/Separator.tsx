import { cn } from "@/lib/utils";

export default function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-[1px] w-full rounded-full bg-primaryColor px-1 opacity-50",
        className,
      )}
    ></div>
  );
}
