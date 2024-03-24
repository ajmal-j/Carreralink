"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface IPage {
  children: ReactNode;
  id: string;
  data: any;
}

export default function CompanyProfileNav({ children, id }: IPage) {
  const pathname = usePathname();
  const pathComp = pathname.substring(pathname.indexOf("companies")).split("/");
  if (pathComp.length === 2) {
    pathComp.push("/");
  }
  let path = pathComp[pathComp.length - 1];
  return (
    <main className="mt-7">
      <nav className="my-3">
        <ul className="flex justify-evenly">
          <Link href={`/dashboard/admin/companies/${id}`} scroll={false}>
            <li
              className={`cursor-pointer rounded-full ${path === "/" ? "bg-primaryColor text-white" : "bg-transparent text-foreground"} px-4 py-1 font-semibold `}
            >
              Snapshot
            </li>
          </Link>
          <Link href={`/dashboard/admin/companies/${id}/jobs`} scroll={false}>
            <li
              className={`cursor-pointer rounded-full ${path === "jobs" ? "bg-primaryColor text-white" : "bg-transparent text-foreground"} px-4 py-1 font-semibold `}
            >
              Job&apos;s
            </li>
          </Link>
        </ul>
      </nav>
      {children}
    </main>
  );
}
