"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Tab() {
  const path = usePathname();
  const [pathname, setPath] = useState<string>("");
  useEffect(() => {
    setPath(path);
  }, [path]);

  return (
    <Tabs
      defaultValue={`${pathname.startsWith("/dashboard/admin/companies/unverified") ? "unverified" : "verified"}`}
      className="w-full"
    >
      <TabsList className="flex w-full justify-between">
        <Link href={"/dashboard/admin/companies"} className="flex-grow">
          <TabsTrigger value="verified" className="w-full">
            Verified
          </TabsTrigger>
        </Link>
        <Link
          href={"/dashboard/admin/companies/unverified"}
          className="flex-grow"
        >
          <TabsTrigger value="unverified" className="w-full">
            Unverified
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
