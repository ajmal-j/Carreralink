import { getJobs } from "@/services/admin.service";
import { IResponseData } from "@/types/paginateResponse";
import { cookies } from "next/headers";
import { Jobs, JobsTable } from "./JobsTable";
import Search from "@/components/FormsAndDialog/Search";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

async function filterJobs(formData: FormData) {
  "use server";
  const values: Record<string, any> = Object.fromEntries(formData.entries());
  values["status"] = values["status"] === "on" ? "closed" : "open";
  const { q, type, location, sort, status } = values;
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(sort && { sort }),
    ...(status && { status }),
  });
  redirect(`${values?.path}?${searchParams.toString()}`);
}

export default async function Jobs({
  searchParams: { p, q, status },
}: {
  searchParams: { p: string; q: string; status?: string };
}) {
  let options = {} as IResponseData;
  let data: Jobs[] = [];
  const query = { p: p ?? 1, q, status };
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
      <form action={filterJobs}>
        <div className="flex gap-3 px-1 text-sm">
          <Checkbox
            type="submit"
            name="status"
            id="status"
            defaultChecked={status === "closed" ? true : false}
          />
          <Label htmlFor="status">Show closed jobs</Label>
        </div>
        <input type="hidden" name="path" value={"/dashboard/admin/jobs"} />
      </form>
      <JobsTable
        total={options.totalDocs}
        options={options}
        query={query}
        jobs={data}
      />
    </div>
  );
}
