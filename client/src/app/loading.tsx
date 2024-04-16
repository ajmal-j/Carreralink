import { TokensIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="overflow-hidden">
      <div className="flex h-screen w-screen animate-pulse items-center justify-center duration-500">
        <Image
          alt="Loading.."
          className="opacity-60 invert-0 dark:invert"
          src="/newLogo.svg"
          width={180}
          height={180}
        />
      </div>
    </div>
  );
}
