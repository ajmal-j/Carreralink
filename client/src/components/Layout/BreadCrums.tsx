"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function Breadcrumbs({
  className,
  home,
}: {
  className?: string;
  home?: {
    href: string;
    label: string;
  };
}) {
  const buildBreadcrumbs = (pathname: any) => {
    const segments = pathname.split("/").filter(Boolean);
    return (
      <BreadcrumbList>
        {home && (
          <>
            <BreadcrumbItem className={`${pathname === "/" && "hidden"}`}>
              <BreadcrumbLink href="/">{home.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator
              className={`${pathname === home.href && "hidden"}`}
            />
          </>
        )}
        {segments.map((segment: any, index: number) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isCurrentPage = index === segments.length - 1;
          return (
            <BreadcrumbItem key={index} className="capitalize">
              {isCurrentPage ? (
                <BreadcrumbPage>
                  {segment.length > 20 ? segment.slice(0, 20) + "..." : segment}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>
                  {segment.length > 20 ? segment.slice(0, 20) + "..." : segment}
                </BreadcrumbLink>
              )}
              {index < segments.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    );
  };

  return (
    <Breadcrumb className={className}>
      {buildBreadcrumbs(usePathname())}
    </Breadcrumb>
  );
}
