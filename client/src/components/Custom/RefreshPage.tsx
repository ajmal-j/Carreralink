"use client";

import { Button } from "../ui/button";

export default function RefreshPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-10 text-xl text-foreground/65">
      Something went wrong...
      <Button variant="outline" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
}
