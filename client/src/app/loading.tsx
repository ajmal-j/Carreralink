import Image from "next/image";

export default function Loading() {
  return (
    <div className="overflow-hidden">
      <div className="flex h-screen w-screen animate-spin items-center justify-center ">
        <Image
          alt="Loading.."
          className="invert dark:invert-0"
          src="/spinner.svg"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
}
