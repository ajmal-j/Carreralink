import NotFound from "@/components/Custom/NotFound";
import { PaginationComponent } from "@/components/Custom/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getApplicants } from "@/services/jobs.service";
import { IApplicant } from "@/types/jobs";
import { IResponseData } from "@/types/paginateResponse";
import { PersonIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";

interface IApplicants {
  params: {
    id: string;
  };
  searchParams: {
    p: number;
  };
}

export default async function Applicants({
  params: { id },
  searchParams: { p = 1 },
}: IApplicants) {
  let options = {} as IResponseData;
  let applications: IApplicant[] = [];
  const token = cookies().get("userToken")?.value || "";
  const query = { p };
  try {
    const response = await getApplicants({ job: id, query, token });
    const { totalDocs, docs, ...rest } = response.data;
    options = {
      totalDocs,
      ...rest,
    };
    applications = docs;
  } catch (error) {
    console.log(error);
    return <NotFound title="Some error occurred." />;
  }
  if (!applications.length)
    return <NotFound hideBackButton title="No applicant's." />;
  return (
    <div className="mt-10 flex flex-col gap-2">
      <h1 className="mx-3 mb-2 text-xl font-semibold text-foreground/90">
        Applicants :{" "}
      </h1>
      {applications.map((applicant, index) => (
        <div
          key={index}
          className="flex cursor-pointer gap-3 rounded-2xl bg-foreground/5 px-4 py-3 transition-colors duration-200 hover:bg-foreground/10"
        >
          <Avatar className="size-12">
            <AvatarImage src={applicant.user.profile} />
            <AvatarFallback>
              <PersonIcon />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 ">
            <Link
              href={`/dashboard/recruiter/jobs/applicant/${applicant.user.username}`}
              className="text-lg capitalize hover:underline"
            >
              {applicant.user.username}
            </Link>
            <p className="text-sm text-foreground/70">{applicant.user.email}</p>
            <p className="block text-sm text-foreground/70">
              <span>applied </span>
              {formatDistanceToNow(applicant.createdAt)}
            </p>
          </div>
          <div className="flex h-full flex-col">
            <div className="flex w-full flex-col gap-1">
              <Button size={"sm"} variant={"outline"}>
                {applicant.status}
              </Button>
              <Link className="w-full" href={applicant.resume}>
                <Button size={"sm"} className="w-full" variant={"outline"}>
                  resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <PaginationComponent
        defaultValues={query}
        options={options}
        path={`/dashboard/recruiter/jobs/${id}`}
      />
    </div>
  );
}
