"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Search from "@/components/FormsAndDialog/Search";
import { allCompanies } from "@/services/company.service";
import { ArrowRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ICompany {
  name: string;
  logo: string;
  id: number;
  website: string;
  tagline: string;
  jobs: [];
  industry: string;
}

const topIndustries = [
  "IT",
  "Software",
  "Design",
  "Marketing",
  "IT",
  "Software",
  "Design",
  "Marketing",
  "IT",
  "Software",
  "Design",
];

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await allCompanies();
      setCompanies(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <h1 className="mt-6 text-center text-4xl">Top companies hiring now</h1>
      <Search action="/companies" className="mt-10 max-w-[600px]" />
      <div className="mt-10 flex flex-col gap-3">
        <div>
          <h1 className="mb-3 font-montserrat font-semibold text-foreground/90">
            Top Industrie&apos;s
          </h1>
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-3 ">
            <span className="flex cursor-pointer items-center px-3">
              <svg
                width="35px"
                height="35px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {topIndustries.map((industry, index) => (
              <li
                className="flex max-w-[200px] flex-grow cursor-pointer items-center justify-center rounded-full border border-foreground/40 px-4 py-1.5 capitalize transition-all duration-150 hover:bg-foreground/10 "
                key={index}
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>
        <h4 className="mt-5 text-foreground/70">
          Showing {companies.length} companies
        </h4>
        <div className="flex flex-col gap-6">
          {!!companies.length &&
            companies.map((company) => (
              <div key={company.id} className="flex gap-3">
                <Link href={`/companies/${company.id}`} scroll>
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
                </div>
                <div className="flex flex-col items-end justify-center gap-3">
                  <span className="text-sm text-foreground/70">
                    Open jobs:{" "}
                    <span className="text-foreground">
                      {company.jobs.length}
                    </span>
                  </span>
                  <PrimaryButton className="w-min px-3">
                    <span className="flex items-center justify-center  gap-1 ps-0 md:ps-2">
                      <span className="hidden md:block">Jobs</span>{" "}
                      <ArrowRightIcon />
                    </span>
                  </PrimaryButton>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
