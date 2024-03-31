"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function RecruiterTab() {
  const pathname = usePathname();
  const [defaultValue, setDefaultValue] = useState<string>("");
  useLayoutEffect(() => {
    setDefaultValue(() => {
      return `${pathname.startsWith("/dashboard/company/recruiter/requests") ? "requests" : "recruiter"}`;
    });
    
  }, [pathname]);
  return (
    <Tabs value={defaultValue} className="w-full">
      <TabsList className="flex w-full justify-between">
        <Link href={"/dashboard/company/recruiter"} className="flex-grow">
          <TabsTrigger value="recruiter" className="w-full">
            Recruiter&lsquo;s
          </TabsTrigger>
        </Link>
        <Link
          href={"/dashboard/company/recruiter/requests"}
          className="flex-grow"
        >
          <TabsTrigger value="requests" className="w-full">
            Request&lsquo;s
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
