"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const paths = [
  {
    name: "Saved Job's",
    path: "/my-jobs",
  },
  {
    name: "Applied Job's",
    path: "/my-jobs/applied",
  },
  {
    name: "Interview's",
    path: "/my-jobs/interview",
  },
];

export default function MyJobTab() {
  const pathname = usePathname();
  return (
    <div className="mb-10 flex flex-col gap-5 px-2">
      <div className="mt-5 flex flex-wrap items-center justify-around gap-3 md:justify-start">
        {paths.map((path) => (
          <Link
            key={path.name}
            href={path.path}
            className={`text-nowrap rounded-full px-3 py-1  text-sm ${pathname === path.path ? "bg-primaryColor text-white" : ""} transition-colors duration-300 ease-in-out`}
          >
            {path.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
