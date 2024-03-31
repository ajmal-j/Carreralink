import { getJobs } from "@/services/admin.service";
import { IResponseData } from "@/types/paginateResponse";
import { cookies } from "next/headers";
import { Jobs, JobsTable } from "./JobsTable";
import Search from "@/components/FormsAndDialog/Search";

export default async function Jobs({
  searchParams: { p, q },
}: {
  searchParams: { p: string; q: string };
}) {
  let options = {} as IResponseData;
  let data: Jobs[] = [];
  const query = { p: p ?? 1, q };
  try {
    const token = cookies().get("adminToken")?.value ?? "";
    const response = await getJobs({ query, token });
    const d = response?.data?.docs;
    for (const job of d) {
      data.push({
        ...job,
        company: job.company.name,
      });
    }
    const { totalDocs, ...rest } = response.data;
    options = {
      totalDocs,
      ...rest,
    };
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col">
      <Search
        defaultValue={q}
        className="mb-6 w-full max-w-[600px] flex-1"
        action="/dashboard/admin/jobs"
      />
      <JobsTable
        total={options.totalDocs}
        options={options}
        query={query}
        jobs={data}
      />
    </div>
  );
}
