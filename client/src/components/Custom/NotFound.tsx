"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function NotFound({
  title = "Not Found",
  hideBackButton = false,
}: {
  title?: string;
  hideBackButton?: boolean;
}) {
  const { back } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-10 text-xl capitalize text-foreground/65">
      {title}
      {!hideBackButton && (
        <Button variant="outline" onClick={back}>
          Go Back
        </Button>
      )}
    </div>
  );
}
