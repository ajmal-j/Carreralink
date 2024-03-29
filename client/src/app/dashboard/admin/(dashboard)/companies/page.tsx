import { PaginationComponent } from "@/components/Custom/Paginations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  getUnverifiedCompanies,
  rejectCompany,
  verifyCompany,
} from "@/services/admin.service";
import { ICompany } from "@/types/company";
import { IResponseData } from "@/types/paginateResponse";
import { ArrowRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
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
    const response = await getUnverifiedCompanies({
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

  const confirmVerification = async (formData: FormData) => {
    "use server";

    const token = cookies().get("adminToken")?.value ?? "";
    try {
      const { companyId } = Object.fromEntries(formData.entries());
      if (!companyId) return;
      const id = companyId as string;
      await verifyCompany({ token, id });
      revalidatePath(`/dashboard/admin/companies`);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectVerification = async (formData: FormData) => {
    "use server";

    const token = cookies().get("adminToken")?.value ?? "";
    try {
      const { companyId } = Object.fromEntries(formData.entries());
      if (!companyId) return;
      const id = companyId as string;
      await rejectCompany({ token, id });
      revalidatePath(`/dashboard/admin/companies`);
    } catch (error) {
      console.log(error);
    }
  };

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
                href={`/dashboard/admin/companies/${company?._id}`}
                scroll={true}
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
              <div className="flex flex-grow  flex-col justify-between gap-1 md:flex-row">
                <div className="flex flex-1 flex-col gap-[1px]  md:ms-2">
                  <span className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/admin/companies/${company?._id}`}
                      scroll={true}
                    >
                      <h2 className="text-xl font-semibold hover:underline">
                        {company.name}
                      </h2>
                    </Link>
                    <Link target="_blank" href={company.website}>
                      <ExternalLinkIcon className="cursor-pointer hover:text-blue-400" />
                    </Link>
                  </span>
                  <p className="text-sm text-foreground/70">
                    {company.tagline}
                  </p>
                  <p className="pb-1 text-sm text-foreground/70">
                    {company.email}
                  </p>
                  <span className="w-min rounded-full border border-foreground/60 px-1.5 pb-[1.5px] text-xs text-foreground/80">
                    {company.industry}
                  </span>
                </div>
                <div className="flex flex-col items-end justify-center gap-3">
                  <span className="flex items-center gap-1 text-sm text-foreground/70">
                    Open jobs:
                    <span className="flex gap-1 text-foreground">
                      {company.jobs.length} <ArrowRightIcon />
                    </span>
                  </span>
                  <CompanyController
                    key={company?._id}
                    id={company?._id as string}
                    confirmVerification={confirmVerification}
                    rejectVerification={rejectVerification}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <PaginationComponent
        defaultValues={defaultValues}
        options={{ ...options }}
        path="/dashboard/admin/companies"
      />
    </div>
  );
}

function CompanyController({
  confirmVerification,
  rejectVerification,
  id,
}: {
  confirmVerification: (formData: FormData) => Promise<void>;
  rejectVerification: (formData: FormData) => Promise<void>;
  id: string;
}) {
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger
          className={cn(
            "inline-flex  items-center justify-center whitespace-nowrap rounded-md border border-red-500/30 bg-transparent px-3 text-sm font-medium text-red-500/80 transition-colors duration-200 hover:bg-red-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          reject
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <Label>Are you sure you want to reject this company?</Label>
          <div className="ms-auto space-x-1">
            <form action={rejectVerification}>
              <input type="hidden" name="companyId" value={id} />
              <Button
                size={"sm"}
                className="bg-red-500/20 text-red-500 hover:bg-red-500/50 hover:text-white"
              >
                confirm
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
      <form action={confirmVerification}>
        <input type="hidden" name="companyId" value={id} />
        <Button className="bg-green-400/30 text-green-500 transition-all duration-200 hover:bg-green-500/50">
          verify
        </Button>
      </form>
    </div>
  );
}
