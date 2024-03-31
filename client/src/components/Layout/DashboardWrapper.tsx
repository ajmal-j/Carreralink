export default function DashboardWrapper({
  children,
  title,
  components,
}: {
  children: React.ReactNode;
  title?: string;
  components?: React.ReactNode;
}) {
  return (
    <article className="mx-auto mb-10 flex h-full w-full max-w-[900px] flex-col gap-3">
      {title && (
        <div className="sticky top-[5.08rem] z-30 mb-6 flex justify-between py-3 ">
          <h1 className="rounded-full bg-background px-3 text-xl text-foreground/70">
            {title}
          </h1>
          {components}
        </div>
      )}
      {children}
    </article>
  );
}
