import { JobFilterValues } from "@/app/(user)/jobs/page";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IResponseData } from "@/types/paginateResponse";

function generateSearchParam({
  q,
  type,
  location,
  filter,
  job,
  p,
  sort,
  status,
}: JobFilterValues) {
  const searchParams = new URLSearchParams();
  if (q) searchParams.append("q", q);
  if (type) searchParams.append("type", type);
  if (location) searchParams.append("location", location);
  if (filter) searchParams.append("filter", filter);
  if (job) searchParams.append("job", job);
  // if (p) searchParams.append("p", p.toString());
  if (sort) searchParams.append("sort", sort);
  if (status) searchParams.append("status", status);

  return searchParams.toString();
}

interface PageProps {
  options: Omit<IResponseData, "docs">;
  defaultValues: JobFilterValues;
  path: string;
}

export function PaginationComponent({
  options,
  defaultValues,
  path,
}: PageProps) {
  const { page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
    options;
  const newSearchParams = generateSearchParam(defaultValues);

  return (
    <Pagination className="mb-10 mt-10">
      <PaginationContent className="ms-auto">
        <PaginationItem>
          <PaginationPrevious
            isActive={hasPrevPage}
            href={
              hasPrevPage
                ? `${path}?${newSearchParams && newSearchParams.concat("&")}p=${prevPage ? prevPage : 1}`
                : "#"
            }
          />
        </PaginationItem>

        {hasPrevPage && (
          <PaginationItem>
            <PaginationLink
              href={`${path}?${newSearchParams && newSearchParams.concat("&")}p=${1}`}
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
              href={`${path}?${newSearchParams && newSearchParams.concat("&")}p=${nextPage ?? page}`}
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
                ? `${path}?${newSearchParams && newSearchParams.concat("&")}p=${nextPage ?? page}`
                : "#"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
