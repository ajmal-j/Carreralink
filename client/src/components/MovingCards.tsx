"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCard() {
  return (
    <div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased ">
      <InfiniteMovingCards
        items={[
          "Software Engineer",
          "Product Designer",
          "Full Stack Developer",
          "Data Scientist",
          "Frontend Engineer",
          "Backend Developer",
          "Mobile Developer",
        ]}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
