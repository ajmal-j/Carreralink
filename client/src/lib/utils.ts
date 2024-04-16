import { JobFilterValues } from "@/app/(user)/jobs/page";
import { type ClassValue, clsx } from "clsx";
import { differenceInDays, format, parse } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function formatMoney(amount: number): string {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//   }).format(amount);
// }

export const formatMoney = (value: number | string) => {
  return Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(BigInt(value));
};

export const getMessage = (error: any) => {
  return error?.response?.data?.message || "Uh oh! Internal Server Error";
};

// export const getToken = (name: string) => {
//   let token;
//   if (name === "companyToken") {
//     token = cookies().get("companyToken")?.value;
//     if (!token) return redirect("/dashboard/login");
//   } else if (name === "userToken") {
//     token = cookies().get("userToken")?.value;
//     if (!token) return redirect("/login");
//   }
//   return token;
// };

export function generateSearchParam({
  q,
  type,
  location,
  job,
}: JobFilterValues) {
  const searchParams = new URLSearchParams();
  if (q) searchParams.append("q", q);
  if (type) searchParams.append("type", type);
  if (location) searchParams.append("location", location);
  if (job) searchParams.append("job", job);
  return searchParams.toString();
}

export function formatTime(time: string) {
  return format(parse(time, "HH:mm", new Date()), "hh:mm a");
}

export function isTwoDaysLater(date: string) {
  const today = new Date();
  const difference = differenceInDays(today, new Date(date));
  return difference > 2;
}
