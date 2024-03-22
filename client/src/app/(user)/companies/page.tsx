import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { JobPagination } from "@/components/Custom/Paginations";
import Search from "@/components/FormsAndDialog/Search";
import { allCompanies } from "@/services/company.service";
import { IResponseData } from "@/types/paginateResponse";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  MixerVerticalIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface ICompany {
  name: string;
  logo: string;
  id: number;
  _id?: number;
  website: string;
  tagline: string;
  jobs: [];
  industry: string;
}

export default async function Companies({
  searchParams: { p = 1, q, search },
}: {
  searchParams: { p: number; q?: string; search?: string };
}) {
  const defaultValues = { p, q, search };
  let industries: string[] = [];
  let companies: ICompany[] = [];
  let options: IResponseData = {} as IResponseData;
  try {
    const response = await allCompanies(defaultValues);
    companies = response.data.docs;
    const { totalDocs, topIndustries, ...rest } = response.data;
    industries = topIndustries;
    options = {
      totalDocs,
      ...rest,
    };
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <h1 className="mt-6 text-center text-4xl">Top companies hiring now</h1>
      <Search
        defaultValue={defaultValues?.search}
        name="search"
        action="/companies"
        className="mt-10 max-w-[600px]"
      />
      <div className="mt-10 flex flex-col gap-3">
        <div>
          <h1 className="mb-3 font-montserrat font-semibold text-foreground/90">
            Top Industrie&apos;s
          </h1>
          <div className="flex gap-1">
            <MixerVerticalIcon className="mt-1 size-6" />
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 ">
              {industries.map((industry: string, index: number) => (
                <Link
                  href={`/companies${q !== industry ? `?q=${industry}${search ? `&search=${search}` : ""}` : `${search ? `?search=${search}` : ""}`}`}
                  className={`flex cursor-pointer items-center justify-center
                  rounded-full border  px-4 py-1 text-sm capitalize ${q === industry ? "bg-violet-600 text-white hover:bg-violet-800" : "bg-violet-600/20 text-violet-400 hover:bg-violet-500/50"} transition-all duration-300 ease-in-out `}
                  key={index}
                >
                  {industry}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <h4 className="mt-5 text-foreground/70">
          Showing {options?.totalDocs ?? 0} companies
        </h4>
        <div className="flex flex-col gap-2">
          {!!companies.length &&
            companies.map((company) => (
              <div
                key={company.id}
                className="flex gap-3 rounded-xl border px-2 py-2 transition-all duration-150 hover:bg-foreground/5"
              >
                <Link href={`/companies/${company?._id}`} scroll>
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
                <Link
                  href={`/companies/${company?._id}`}
                  className="flex flex-1 flex-col gap-[1px]  md:ms-2"
                >
                  <span className="flex items-center gap-2">
                    <Link href={`/companies/${company.id}`}>
                      <h2 className="text-xl font-semibold">{company.name}</h2>
                    </Link>
                    <Link target="_blank" href={company.website}>
                      <ExternalLinkIcon className="cursor-pointer hover:text-blue-400" />
                    </Link>
                  </span>
                  <p className="text-sm text-foreground/70">
                    {company.tagline}
                  </p>
                  <span className="w-min rounded-full border border-foreground/60 px-1.5 pb-[1.5px] text-xs text-foreground/80">
                    {company.industry}
                  </span>
                </Link>
                <div className="flex flex-col items-end justify-center gap-3">
                  <span className="text-sm text-foreground/70">
                    Open jobs:{" "}
                    <span className="text-foreground">
                      {company.jobs.length}
                    </span>
                  </span>
                  <Link href={`/companies/${company?._id}/jobs`}>
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
        <JobPagination
          defaultValues={defaultValues}
          options={{ ...options }}
          path="/companies"
        />
      </div>
    </>
  );
}
