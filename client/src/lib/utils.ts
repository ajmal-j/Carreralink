import { type ClassValue, clsx } from "clsx";
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

export function getCookie(cname: string) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
