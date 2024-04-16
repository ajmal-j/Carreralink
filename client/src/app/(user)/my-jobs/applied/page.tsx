"use client";

import NotFound from "@/components/Custom/NotFound";
import { PaginationComponent } from "@/components/Custom/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { statusButtonColors } from "@/constants";
import { formatMoney } from "@/lib/utils";
import { getAppliedJobs, withdraw } from "@/services/jobs.service";
import { IAvailableStatus } from "@/types/jobs";
import { IResponseData } from "@/types/paginateResponse";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

type IApplied = {
  _id: string;
  createdAt: string;
  status: IAvailableStatus;
  resume: string;
  job: {
    _id: string;
    title: string;
    company: {
      _id: string;
      name: string;
      website: string;
      logo: string;
      tagline: string;
      email: string;
      industry: string;
      headquarters: string;
    };
    createdAt: string;
    type: string;
    category: string;
    officeLocation: string;
    workSpace: string;
    openings: string;
    status: string;
    skills: string[];
    pay: {
      maximum: string;
      minimum: string;
      rate: string;
    };
  };
};

export default function Applied({
  searchParams: { p = 1 },
}: {
  searchParams: {
    p: string | number;
  };
}) {
  const [jobs, setJobs] = useState<IApplied[]>([]);
  const [options, setOptions] = useState<IResponseData>({} as IResponseData);
  const query = { p };
  const fetchJobs = async () => {
    const response = await getAppliedJobs();
    const { docs, ...rest } = await response?.data;
    setJobs(docs);
    setOptions(rest);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  if (!jobs.length)
    return <NotFound title="You have not applied for any job yet" />;
  return (
    <div className="flex flex-col gap-3">
      <span className="ms-2 text-foreground/70">
        Total {options?.totalDocs || 0}
      </span>
      {jobs.map((applied) => {
        return (
          <AppliedJob setJobs={setJobs} applied={applied} key={applied._id} />
        );
      })}
      <PaginationComponent
        defaultValues={query}
        path="/my-jobs/applied"
        options={options}
      />
    </div>
  );
}

const AppliedJob = ({
  applied,
  setJobs,
}: {
  applied: IApplied;
  setJobs: React.Dispatch<React.SetStateAction<IApplied[]>>;
}) => (
  <div className="flex cursor-pointer gap-3 rounded-xl px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-foreground/10">
    <Avatar className="size-14">
      <AvatarImage src={applied.job.company.logo} />
      <AvatarFallback>C</AvatarFallback>
    </Avatar>
    <Link href={`/jobs/${applied.job._id}`} className="flex flex-1 flex-col">
      <div className="flex flex-wrap items-baseline gap-2">
        <h1 className="text-xl hover:underline">{applied.job.title}</h1>
        <p className="text-sm text-foreground/70 before:content-['('] after:content-[')']">
          {applied.job.company.name}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 divide-foreground/40 text-sm">
        <p className="text-foreground/70">{applied.job.type}</p>
        <p className="text-sm text-foreground/70 before:content-['('] after:content-[')']">
          {applied.job.workSpace}
        </p>
      </div>
      <p className="text-sm text-foreground/70">{applied.job.officeLocation}</p>
      <div className="flex">
        <p>
          <span className="me-2 text-foreground/70">
            {applied.job?.pay?.rate}
          </span>
          ₹{" "}
          {applied.job?.pay?.minimum && formatMoney(applied.job?.pay?.minimum)}{" "}
          - {formatMoney(applied.job?.pay?.maximum)}
        </p>
      </div>
    </Link>
    <div className="flex flex-col gap-1">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-full flex-col justify-between ">
          <Button
            variant={"outline"}
            className={`capitalize text-foreground hover:${statusButtonColors[applied.status]}/70 border border-muted ${statusButtonColors[applied.status]}`}
          >
            {applied.status}
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex size-7 items-center justify-center rounded-full border bg-foreground/10 transition-colors duration-200 ease-in-out hover:bg-foreground/30">
            <DotsVerticalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-center">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col">
              <Link
                className="block w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-150 ease-in-out hover:bg-foreground/10"
                href={`/jobs/${applied.job._id}`}
              >
                Job
              </Link>
              <Link
                className="block w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-150 ease-in-out hover:bg-foreground/10"
                href={`/companies/${applied.job.company._id}`}
              >
                company
              </Link>
              <Link
                className="block w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-150 ease-in-out hover:bg-foreground/10"
                href={applied.resume}
                target="_blank"
              >
                resume
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"destructive"}
                    className="mt-2 w-full opacity-70 hover:opacity-100"
                  >
                    withdraw
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="flex flex-col gap-2">
                  <Label>
                    Are you sure you want to withdraw this application?
                  </Label>
                  <PopoverClose className="ms-auto space-x-1">
                    <Button
                      onClick={async () => {
                        await withdraw({
                          job: applied.job._id,
                        });
                        setJobs((app) =>
                          app.filter((j) => j._id !== applied._id),
                        );
                        toast({
                          title: "Application withdrawn",
                          description: "your application has been withdrawn",
                        });
                      }}
                      size={"sm"}
                      className="bg-red-500/20 text-red-500 hover:bg-red-500/50 hover:text-white"
                    >
                      confirm
                    </Button>
                  </PopoverClose>
                </PopoverContent>
              </Popover>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mt-auto block text-end text-sm text-foreground/70">
        {formatDistanceToNow(applied.createdAt)}
      </p>
    </div>
  </div>
);
