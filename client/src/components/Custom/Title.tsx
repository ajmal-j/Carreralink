import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Title({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center font-montserrat font-bold", className)}
    >
      <Link className="flex pb-2" href={"/"}>
        <Image
          alt="CarreraLink"
          className="dark:invert"
          src="/newLogo.svg"
          width={140}
          height={50}
        />
        {/* <div>CarreraLink</div> */}
      </Link>
    </div>
  );
}
