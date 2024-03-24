"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Tab() {
  const pathname = usePathname();
  return (
    <Tabs
      defaultValue={`${pathname.startsWith("/dashboard/admin/companies/verified") ? "verified" : "unverified"}`}
      className="w-full"
    >
      <TabsList className="flex w-full justify-between">
        <Link href={"/dashboard/admin/companies"} className="flex-grow">
          <TabsTrigger value="unverified" className="w-full">
            Unverified
          </TabsTrigger>
        </Link>
        <Link
          href={"/dashboard/admin/companies/verified"}
          className="flex-grow"
        >
          <TabsTrigger value="verified" className="w-full">
            Verified
          </TabsTrigger>
        </Link>
      </TabsList>
      {/* <TabsContent value="unverified">unverified</TabsContent>
      <TabsContent value="verified">verified</TabsContent> */}
    </Tabs>
  );
}
