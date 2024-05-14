/* eslint-disable @next/next/no-img-element */
import BackButton from "@/components/Buttons/BackButton";
import NotFound from "@/components/Custom/NotFound";
import { EditCompanyProfile } from "@/components/FormsAndDialog/EditCompanyProfile";
import CompanyProfileNav from "@/components/Layout/CompanyProfileNav";
import { editCompany } from "@/services/admin.service";
import { getCompany } from "@/services/company.service";
import { ICompany } from "@/store/reducers/company.slice";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { markdownToDraft } from "markdown-draft-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Image from "next/image";
import { ReactNode } from "react";

interface IPage {
  params: {
    id: string;
  };
  children: ReactNode;
}

const editFunction = async (values: Record<string, any>, id: string) => {
  "use server";
  const token = cookies().get("adminToken")?.value || "";
  const data = new FormData();
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      data.append(key, values[key]);
    }
  }
  data.append("id", id);
  await editCompany({ token, data });
  revalidatePath(`/dashboard/admin/companies/${id}`);
};

export default async function Layout({ params: { id }, children }: IPage) {
  let company: ICompany | null = {} as ICompany;
  try {
    const response = await getCompany(id);
    company = response?.data;
  } catch (error) {
    company = null;
    console.log(error);
  }
  return company === null ? (
    <NotFound title="Something went wrong." />
  ) : (
    <article className="mb-10 flex flex-col gap-3">
      <div className="ps-3">
        <BackButton />
      </div>
      <div className="relative w-full px-3">
        <img
          className="max-h-[400px] w-full  rounded-xl object-cover object-center"
          src={company.coverPhoto}
          alt="cover photo"
        />
        <span className="absolute bottom-1.5 left-4 rounded-2xl md:bottom-5 md:left-9">
          <div className="my-auto flex size-[50px] h-full w-full justify-center gap-3 rounded-full border border-background/10 bg-white shadow-xl md:size-[80px] ">
            <Image
              className="rounded-full object-contain object-center"
              src={company.logo}
              alt="Company logo"
              width={100}
              height={100}
            />
          </div>
        </span>
      </div>
      <div className="mt-5 flex h-full  gap-3">
        <div className="flex h-full w-min rounded-full bg-white ">
          <Image
            alt="company ceo"
            src={company?.imageOfCEO || ""}
            width={200}
            height={200}
            className="max-w-[80px] rounded-full object-cover object-center md:max-w-[130px]"
          />
        </div>
        <div className="flex-1 place-self-end pb-2">
          <h1 className="pb-2 text-xl font-semibold md:text-3xl">
            {company.name}
          </h1>
          <h1 className="text-foreground/70">{company.email}</h1>
          <h2 className="text-foreground/60 before:content-['“'] after:content-['”']">
            {company.tagline}
          </h2>
          <a
            href={company.website}
            className="flex items-center gap-2 text-foreground/60 underline hover:text-foreground/90"
          >
            {company?.website?.length > 15
                      ? (company.website as string)
                          .substring(0, 16)
                          .concat("...")
                      : company.website} <ExternalLinkIcon />
          </a>
        </div>
        <div className="mt-auto pb-3">
          <EditCompanyProfile
            editFunction={editFunction}
            id={id}
            // @ts-expect-error
            defaultValues={{
              name: company?.name,
              website: company?.website,
              logo: "",
              tagline: company?.tagline,
              email: company?.email,
              industry: company?.industry,
              foundedOn: String(company?.foundedOn),
              ceo: company?.ceo,
              imageOfCEO: "",
              revenue: company?.revenue,
              headquarters: company?.headquarters,
              size: String(company?.size),
              description: markdownToDraft(company?.description),
            }}
          />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="flex flex-grow flex-col items-center justify-between rounded-xl border border-foreground/40 px-4 py-3  hover:bg-foreground/10">
          <h2 className="w-full pb-2 text-sm  font-bold text-foreground/70">
            CEO
          </h2>
          <h1 className="w-full text-xl">{company.ceo}</h1>
        </span>
        <span className="flex  flex-grow flex-col items-center justify-between rounded-xl border border-foreground/40 px-4 py-3  hover:bg-foreground/10">
          <h2 className="w-full pb-2 text-sm  font-bold text-foreground/70">
            Revenue
          </h2>
          <h1 className="w-full text-xl">{company.revenue}</h1>
        </span>
        <span className="flex flex-grow  flex-col items-center justify-between rounded-xl border border-foreground/40 px-4 py-3 hover:bg-foreground/10 ">
          <h2 className="w-full pb-2 text-sm  font-bold text-foreground/70">
            Industry
          </h2>
          <h1 className="w-full text-xl">{company.industry}</h1>
        </span>
        <span className="flex flex-grow  flex-col items-center justify-between rounded-xl border border-foreground/40 px-4 py-3 hover:bg-foreground/10 ">
          <h2 className="w-full pb-2 text-sm  font-bold text-foreground/70">
            Headquarters
          </h2>
          <h1 className="w-full text-xl">{company.headquarters}</h1>
        </span>
      </div>
      <CompanyProfileNav
        route="/dashboard/admin/companies"
        id={id}
        data={company}
      >
        {children}
      </CompanyProfileNav>
    </article>
  );
}
