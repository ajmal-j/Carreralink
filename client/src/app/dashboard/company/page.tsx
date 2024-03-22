/* eslint-disable @next/next/no-img-element */
"use client";
import Markdown from "@/components/Custom/Markdown";
import Separator from "@/components/Custom/Separator";
import { EditCompanyProfile } from "@/components/FormsAndDialog/EditCompanyProfile";
import { getCompanyData } from "@/services/company.service";
import { useStateSelector } from "@/store";
import { setState } from "@/store/reducers/company.slice";
import { ExternalLinkIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { markdownToDraft } from "markdown-draft-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
  size: string;
  recruiters: string[];
  jobs: string[];
  coverPhoto: string;
}
export default function DashBoard() {
  const company = useStateSelector((state) => state.company);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const data = await getCompanyData();
        dispatch(setState(data.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <article className="mx-auto flex h-full w-full max-w-[900px] flex-col gap-3 ">
      <h1 className="sticky top-[5.08rem] z-30 mb-6 bg-background py-3 ps-3 text-xl text-foreground/70 ">
        Company Profile
      </h1>
      <div className="relative w-full px-3">
        <img
          className="max-h-[400px] w-full  rounded-xl object-cover object-center"
          src={company?.coverPhoto}
          alt="cover photo"
        />
        <span className="absolute bottom-1.5 left-4 rounded-2xl md:bottom-5 md:left-9">
          <div className="my-auto flex size-[50px] justify-center gap-3 rounded-full border border-background/10 bg-white shadow-xl md:size-[80px] ">
            <Image
              className="rounded-full object-contain object-center"
              src={company?.logo || ""}
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
            src={company?.imageOfCEO || ""}
            width={200}
            height={200}
            className="max-w-[80px] rounded-full object-cover object-center md:max-w-[130px]"
          />
        </div>
        <div className="flex-1 place-self-end pb-2">
          <h1 className="pb-2 text-xl font-semibold md:text-3xl">
            {company?.name}
          </h1>
          <h1 className="text-foreground/70">{company?.email}</h1>
          <h2 className="text-foreground/60 before:content-['“'] after:content-['”']">
            {company?.tagline}
          </h2>
          <a
            href={company?.website}
            className="flex flex-wrap items-center gap-2 text-foreground/60 underline hover:text-foreground/90"
          >
            <span className="truncate">
              {company?.website?.length > 15
                ? (company?.website as string).substring(0, 16).concat("...")
                : company?.website}
            </span>{" "}
            <ExternalLinkIcon />
          </a>
        </div>
        <div className="mt-auto pb-3">
          <EditCompanyProfile
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
          <h1 className="w-full text-xl">{company?.ceo}</h1>
        </span>
        <span className="flex  flex-grow flex-col items-center justify-between rounded-xl border border-foreground/40 px-4 py-3  hover:bg-foreground/10">
          <h2 className="w-full pb-2 text-sm  font-bold text-foreground/70">
            Revenue
          </h2>
          <h1 className="w-full text-xl">{company?.revenue}</h1>
        </span>
        <span className="flex flex-grow  flex-col items-center justify-between rounded-xl border border-foreground/40 px-4 py-3 hover:bg-foreground/10 ">
          <h2 className="w-full pb-2 text-sm  font-bold text-foreground/70">
            Industry
          </h2>
          <h1 className="w-full text-xl">{company?.industry}</h1>
        </span>
        <span className="flex flex-grow  flex-col items-center justify-between rounded-xl border border-foreground/40 px-4 py-3 hover:bg-foreground/10 ">
          <h2 className="w-full pb-2 text-sm  font-bold text-foreground/70">
            Headquarters
          </h2>
          <h1 className="w-full text-xl">{company?.headquarters}</h1>
        </span>
      </div>
      <div className="mt-7 flex flex-col gap-5 pb-4">
        <Separator />
        <div className="flex gap-5">
          <span className="w-[20%] font-semibold text-foreground/70">
            Founded
          </span>
          <div className="w-[80%]">
            <span className="font-semibold text-foreground before:pe-3 before:content-[':']">
              {company?.foundedOn}
            </span>
          </div>
        </div>
        <Separator />
        <div className="flex gap-5">
          <span className="w-[20%] font-semibold text-foreground/70">
            Company Size
          </span>
          <div className="w-[80%]">
            <span className="font-semibold text-foreground before:pe-3 before:content-[':']">
              More than {company?.size}{" "}
              <span className="hidden md:inline">employees.</span>
            </span>
          </div>
        </div>
        <Separator />
        <div className="pb-10">
          <h1 className="mb-3 text-center text-xl text-foreground/80">
            About {company?.name}
          </h1>
          <Markdown>{company?.description as string}</Markdown>
        </div>
      </div>
    </article>
  );
}