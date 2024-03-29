import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { PaginationComponent } from "@/components/Custom/Paginations";
import { getVerifiedCompanies } from "@/services/admin.service";
import { ICompany } from "@/types/company";
import { IResponseData } from "@/types/paginateResponse";
import { ArrowRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Companies({
  searchParams: { p },
}: {
  searchParams: { p: string };
}) {
  let companies: ICompany[] = [];
  let options: IResponseData = {} as IResponseData;

  const token = cookies().get("adminToken")?.value ?? "";
  const defaultValues = { p: p ?? 1 };
  try {
    const response = await getVerifiedCompanies({
      token,
      query: defaultValues,
    });
    companies = response?.data?.docs;
    const { totalDocs, ...rest } = response.data;
    options = {
      totalDocs,
      ...rest,
    };
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="">
      <h4 className="mb-1 mt-5 ps-1 text-foreground/70">
        Showing {options?.totalDocs ?? 0} companies
      </h4>
      <div className="flex flex-col gap-2">
        {!!companies.length &&
          companies.map((company) => (
            <div
              key={company.id}
              className="flex gap-3 rounded-xl px-2 py-2 transition-all duration-150 hover:bg-foreground/5"
            >
              <Link
                href={`/dashboard/admin/companies/${company?._id ?? company?.id}`}
                scroll
              >
                <div className="my-auto flex size-[50px] justify-center gap-3 rounded-full border bg-white md:size-[80px] ">
                  <Image
                    className="rounded-full object-contain object-center"
                    src={company.logo}
                    alt="Company logo"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-[1px]  md:ms-2">
                <span className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/admin/companies/${company?._id ?? company?.id}`}
                  >
                    <h2 className="text-xl font-semibold">{company.name}</h2>
                  </Link>
                  <Link target="_blank" href={company.website}>
                    <ExternalLinkIcon className="cursor-pointer hover:text-blue-400" />
                  </Link>
                </span>
                <p className="text-sm text-foreground/70">{company.tagline}</p>
                <p className="pb-1 text-sm text-foreground/70">
                    {company.email}
                  </p>
                <span className="w-min rounded-full border border-foreground/60 px-1.5 pb-[1.5px] text-xs text-foreground/80">
                  {company.industry}
                </span>
              </div>
              <div className="flex flex-col items-end justify-center gap-3">
                <span className="text-sm text-foreground/70">
                  Open jobs:{" "}
                  <span className="text-foreground">{company.jobs.length}</span>
                </span>
                <Link
                  href={`/dashboard/admin/companies/${company?._id ?? company?.id}/jobs`}
                >
                  <PrimaryButton className="w-min px-3">
                    <span className="flex items-center justify-center  gap-1 ps-0 md:ps-2">
                      <span className="hidden md:block">Jobs</span>{" "}
                      <ArrowRightIcon />
                    </span>
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <PaginationComponent
        defaultValues={defaultValues}
        options={{ ...options }}
        path="/companies"
      />
    </div>
  );
}
