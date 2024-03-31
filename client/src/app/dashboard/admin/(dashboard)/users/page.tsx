import { User, UserTable } from "@/components/Custom/UserTable";
import Search from "@/components/FormsAndDialog/Search";
import { getUsers } from "@/services/admin.service";
import { IResponseData } from "@/types/paginateResponse";
import { cookies } from "next/headers";

export default async function Users({
  searchParams: { p, q },
}: {
  searchParams: { p: string; q?: string };
}) {
  let options = {} as IResponseData;
  let data: User[] = [];
  const query = { p: p ?? 1, q: q ?? "" };
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
    <div>
      <Search
        defaultValue={q}
        placeholder="Search for users..."
        className="mb-6 w-full max-w-[600px] flex-1"
        action="/dashboard/admin/users"
      />
      <UserTable
        total={options.totalDocs}
        options={options}
        query={query}
        users={data}
      />
    </div>
  );
}
