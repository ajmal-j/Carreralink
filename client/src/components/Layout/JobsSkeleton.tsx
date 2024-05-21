import { Skeleton } from "../ui/skeleton";

export function JobSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border bg-background px-4 py-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-start space-x-4">
          <div className="w-full flex-grow space-y-2 ">
            <Skeleton className="h-8 w-full max-w-[250px]" />
            <Skeleton className="h-8 w-[calc(100%-50px)] max-w-[350px]" />
          </div>
          <Skeleton className="me-4 h-28 w-32 rounded-2xl" />
        </div>
      ))}
      <div className="grid justify-end">
        <Skeleton className="h-9 w-32 rounded-full" />
      </div>
    </div>
  );
}
