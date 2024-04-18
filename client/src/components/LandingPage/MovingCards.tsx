"use client";

import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { getSkillsAndCategories } from "@/services/company.service";

export function InfiniteMovingCard() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const response = await getSkillsAndCategories();
    const { category = [] } = await response?.data[0];
    setCategories(category);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
      <InfiniteMovingCards
        items={
          categories?.length
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
