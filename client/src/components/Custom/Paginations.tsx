import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { JobFilterValues } from "@/app/(user)/jobs/page";

function generateSearchParam({ q, type, location }: JobFilterValues) {
  const searchParams = new URLSearchParams();
  if (q) searchParams.append("q", q);
  if (type) searchParams.append("type", type);
  if (location) searchParams.append("location", location);
  return searchParams.toString();
}

interface PageProps {
  options: {
    totalDocs: number;
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
  };
  defaultValues: JobFilterValues;
  path: string;
}

export function JobPagination({ options, defaultValues, path }: PageProps) {
  const { page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
    options;
  const searchParams = generateSearchParam(defaultValues);
  return (
    <Pagination className="mt-5">
      <PaginationContent className="ms-auto">
        <PaginationItem>
          <PaginationPrevious
            isActive={hasPrevPage}
            href={
              hasPrevPage
                ? `${path}?${searchParams && searchParams.concat("&")}p=${prevPage ? prevPage : 1}`
                : "#"
            }
          />
        </PaginationItem>

        {hasPrevPage && (
          <PaginationItem>
            <PaginationLink
              href={`${path}?${searchParams && searchParams.concat("&")}p=${1}`}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {Number(page) < 2 && hasNextPage && prevPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Number(page) > 2 && prevPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {hasNextPage && (
          <PaginationItem>
            <PaginationLink
              href={`${path}?${searchParams && searchParams.concat("&")}p=${nextPage ?? page}`}
            >
              {Number(nextPage)}
            </PaginationLink>
          </PaginationItem>
        )}

        {Number(page) - 1 < Number(totalPages) && hasNextPage && !prevPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            isActive={hasNextPage}
            href={
              hasNextPage
                ? `${path}?${searchParams && searchParams.concat("&")}p=${nextPage ?? page}`
                : "#"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
