import { type ClassValue, clsx } from "clsx";
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
