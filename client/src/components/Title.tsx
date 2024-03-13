import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Title({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Image
        alt="CarreraLink"
        className="invert"
        src="/logo.svg"
        width={35}
        height={35}
      />
      <div className="font-montserrat text-[25px] font-bold">CarreraLink</div>
    </div>
  );
}
