import { User, UserTable } from "@/components/Custom/UserTable";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { getUsers } from "@/services/admin.service";
import { IResponseData } from "@/types/paginateResponse";
import { cookies } from "next/headers";

export default async function Users({
  searchParams: { p },
}: {
  searchParams: { p: string };
}) {
  let options = {} as IResponseData;
  let data: User[] = [];
  const query = { p: p ?? 1 };
  try {
    const token = cookies().get("adminToken")?.value ?? "";
    const response = await getUsers({ query, token });
    data = response?.data?.docs;
    const { totalDocs, ...rest } = response.data;
    options = {
      totalDocs,
      ...rest,
    };
  } catch (error) {
    console.log(error);
  }
  return (
    <DashboardWrapper title="User's">
      <UserTable
        total={options.totalDocs}
        options={options}
        query={query}
        users={data}
      />
    </DashboardWrapper>
  );
}
