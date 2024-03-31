"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AvatarIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import NotFound from "@/components/Custom/NotFound";
import { toast } from "@/components/ui/use-toast";
import { getRecruiters, removeRecruiter } from "@/services/company.service";
import { IResponseData } from "@/types/paginateResponse";
import { PaginationComponent } from "@/components/Custom/Pagination";
import Link from "next/link";
import { getMessage } from "@/lib/utils";

interface PageProps {
  searchParams: {
    p?: number;
  };
}

interface IRecruiter {
  _id: string;
  user: {
    username: string;
    profile: string;
    email: string;
    createdAt: string;
  };
  message: string;
}

export default function Recruiter({ searchParams: { p = 1 } }: PageProps) {
  const [recruiters = [], setRecruiters] = useState<IRecruiter[]>([]);
  const [options, setOptions] = useState<IResponseData>({} as IResponseData);
  const query = { p: p ?? 1 } as const;
  const fetchData = async () => {
    try {
      const response = await getRecruiters();
      const { docs, ...rest } = await response?.data;
      setRecruiters(docs);
      setOptions(rest);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const removeRec = async (id: string) => {
    try {
      await removeRecruiter({ id });
      toast({
        title: "Recruiter Removed",
        description: "Recruiter has been removed successfully",
      });
      setRecruiters(recruiters.filter((recruiter) => recruiter._id !== id));
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {!recruiters.length && <NotFound title="No Recruiters Found." />}
      {recruiters.map((recruiter, index) => {
        return (
          <RecruiterComponent
            removeRec={removeRec}
            key={index}
            recruiter={recruiter}
          />
        );
      })}
      <div>
        <PaginationComponent
          defaultValues={query}
          options={options}
          path="/dashboard/company/recruiter"
        />
      </div>
    </div>
  );
}

const RecruiterComponent = ({
  recruiter,
  removeRec,
}: {
  recruiter: IRecruiter;
  removeRec: (id: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-foreground/5">
      <Link href={`/dashboard/company/recruiter/${recruiter?.user?.username}`}>
        <Avatar className="size-11 cursor-pointer border md:size-14">
          <AvatarImage
            src={recruiter?.user?.profile}
            alt="logo"
            className="object-cover"
          />
          <AvatarFallback>
            <AvatarIcon className="size-6 text-foreground/50" />
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-1 flex-col">
        <Link
          href={`/dashboard/company/recruiter/${recruiter?.user?.username}`}
        >
          <h1 className="text-lg transition-all duration-200 hover:underline">
            {recruiter?.user?.username}
          </h1>
        </Link>
        <span className="text-sm text-foreground/70">
          {recruiter?.user?.email}
        </span>
        <span className="text-sm text-foreground/70">
          Joined : {formatDistanceToNow(recruiter.user.createdAt)}
        </span>
      </div>
      <div className="flex h-full flex-col items-center justify-between gap-2">
        <span className="text-sm">Job&apos;s Posted : 10</span>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"default"}
                className="border border-red-500/60 bg-background text-red-500/60 hover:bg-red-500/30 hover:text-white"
              >
                Remove
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="flex flex-col gap-2">
              <Label>Are you sure you want to remove this recruiter?</Label>
              <PopoverClose className="ms-auto space-x-1">
                <Button
                  onClick={() => removeRec(recruiter?._id)}
                  size={"sm"}
                  className="bg-red-500/20 text-red-500 hover:bg-red-500/50 hover:text-white"
                >
                  confirm
                </Button>
              </PopoverClose>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
