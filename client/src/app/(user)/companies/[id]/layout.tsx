/* eslint-disable @next/next/no-img-element */
"use client";
import NotFound from "@/components/Custom/NotFound";
import CompanyProfileNav from "@/components/Layout/CompanyProfileNav";
import { getCompany } from "@/services/company.service";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

export interface ICompany {
  id: string;
  name: string;
  website: string;
  logo: string;
  tagline: string;
  email: string;
  industry: string;
  foundedOn: number;
  imageOfCEO: string;
  description: string;
  ceo: string;
  revenue: string;
  headquarters: string;
  size: number;
  recruiters: string[];
  jobs: string[];
  coverPhoto: string;
}
interface IPage {
  params: {
    id: string;
  };
  children: ReactNode;
}

export default function Layout({ params: { id }, children }: IPage) {
  const [company, setCompany] = useState<ICompany | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getCompany(id);
        setCompany(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return company === null ? (
    <NotFound title="Company not found" />
  ) : (
    <article className="flex flex-col gap-3">
      <div className="relative w-full px-3">
        <img
          className="max-h-[400px] w-full  rounded-xl object-cover object-center"
          src={company.coverPhoto}
          onError={(e) =>
            (e.currentTarget.src =
              "https://raw.githubusercontent.com/ajmal-j/Weather-app-with-ums/master/client/public/companyCover.png")
          }
          alt="cover photo"
        />
        <span className="absolute bottom-1.5 left-4 rounded-2xl md:bottom-5 md:left-9">
          <div className="my-auto flex size-[50px] justify-center gap-3 rounded-full border border-background/10 bg-white shadow-xl md:size-[80px] ">
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
      <div className="mt-5 flex items-center gap-3">
        <div className="w-min">
          <Image
            alt="company ceo"
            src={company.imageOfCEO}
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
            {company.website} <ExternalLinkIcon />
          </a>
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
      <CompanyProfileNav id={id} data={company}>
        {children}
      </CompanyProfileNav>
    </article>
  );
}