import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  const kookie = cookies().get("userToken")?.value;
  if (!kookie) return redirect("/login");
  return <div>{children}</div>;
}
