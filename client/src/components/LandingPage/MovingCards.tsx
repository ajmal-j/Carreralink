"use client";

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteMovingCard({ categories }: { categories: string[] }) {
  return (
    <div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
      <InfiniteMovingCards
        items={
          categories.length
            ? categories
            : [
                "Information Technology",
                "Healthcare",
                "Finance and Accounting",
                "Sales and Marketing",
                "Customer Service",
                "Education and Training",
                "Engineering",
                "Human Resources",
                "Administrative and Clerical",
                "Retail and Hospitality",
              ]
        }
        direction="right"
        speed="slow"
      />
    </div>
  );
}
