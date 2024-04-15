import { cn } from "@/lib/utils";

export default function DashboardWrapper({
  children,
  title,
  components,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  components?: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "mx-auto mb-10 flex h-full w-full max-w-[900px] flex-col gap-3",
        className,
      )}
    >
      {title && (
        <div className="sticky top-[5.08rem] z-30 mb-6 flex justify-between pb-3">
          <h1 className="rounded-br-xl bg-background px-3 pt-2 text-xl text-foreground/70">
            {title}
          </h1>
          <div className="pt-2">{components}</div>
        </div>
      )}
      {children}
    </article>
  );
}
