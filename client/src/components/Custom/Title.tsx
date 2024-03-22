import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Title({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 font-montserrat text-[25px] font-bold",
        className,
      )}
    >
      <Link className="flex items-center gap-1" href={"/"}>
        <Image
          alt="CarreraLink"
          className="dark:invert"
          src="/logo.svg"
          width={35}
          height={35}
        />
        <div>CarreraLink</div>
      </Link>
    </div>
  );
}
