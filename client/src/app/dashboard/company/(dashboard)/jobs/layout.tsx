import NotFound from "@/components/Custom/NotFound";
import { isVerified } from "@/services/company.service";
import { cookies } from "next/headers";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const token = cookies().get("companyToken")?.value ?? "";
    const response = await isVerified(token);
    if (!response.data)
      return <NotFound title="You are not yet verified by the admin." />;
  } catch (error) {
    console.log(error);
  }
  return <>{children}</>;
}
