export default function DashboardWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <article className="mx-auto mb-10 flex h-full w-full max-w-[900px] flex-col gap-3">
      {title && (
        <h1 className="sticky top-[5.08rem] z-30 mb-6 bg-background py-3 text-xl text-foreground/70 ">
          {title}
        </h1>
      )}
      {children}
    </article>
  );
}
