"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AvatarIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import NotFound from "@/components/Custom/NotFound";
import {
  assignRecruiter,
  getPendingRequests,
  rejectRequest,
} from "@/services/company.service";
import { IResponseData } from "@/types/paginateResponse";
import { toast } from "@/components/ui/use-toast";
import { PaginationComponent } from "@/components/Custom/Pagination";
import Link from "next/link";
import { getMessage } from "@/lib/utils";
import Markdown from "@/components/Custom/Markdown";

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

export default function Requests({ searchParams: { p = 1 } }: PageProps) {
  const [recruiters = [], setRecruiters] = useState<IRecruiter[]>([]);
  const [options, setOptions] = useState<IResponseData>({} as IResponseData);
  const query = { p: p ?? 1 } as const;
  const fetchData = async () => {
    try {
      const response = await getPendingRequests();
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

  const assignRec = async (id: string) => {
    try {
      await assignRecruiter({ id });
      toast({
        title: "Recruiter Assigned",
        description: "Recruiter has been assigned successfully",
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
  const rejectReq = async (id: string) => {
    try {
      await rejectRequest({ id });
      toast({
        title: "Request Rejected",
        description: "Recruiter request has been rejected successfully",
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
      {!recruiters.length && <NotFound title="No Requests." />}
      {recruiters.map((recruiter, index) => {
        return (
          <RequestComponent
            assignRec={assignRec}
            rejectReq={rejectReq}
            key={index}
            recruiter={recruiter}
          />
        );
      })}
      <div>
        <PaginationComponent
          options={options}
          defaultValues={query}
          path="/dashboard/company/recruiter/requests"
        />
      </div>
    </div>
  );
}

const RequestComponent = ({
  recruiter,
  assignRec,
  rejectReq,
}: {
  recruiter: IRecruiter;
  assignRec: (id: string) => void;
  rejectReq: (id: string) => void;
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-foreground/5">
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
      <div className="flex w-full flex-1 flex-col sm:w-max">
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
      <div className="flex h-full w-full flex-col items-center justify-start gap-2 sm:w-min">
        <Dialog>
          <DialogTrigger className="w-full">
            <Button variant="outline" className="flex w-full gap-2">
              <span className="text-foreground/70">request :</span>{" "}
              <EnvelopeClosedIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3 text-lg text-foreground/70">
                Message.
              </DialogTitle>
              <Markdown className="max-h-[500px] overflow-x-auto">
                {recruiter.message}
              </Markdown>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="flex w-full gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"default"}
                className="w-full border border-red-500/60 bg-background text-red-500/60 hover:bg-red-500/30 hover:text-white"
              >
                reject
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="flex flex-col gap-2">
              <Label>Are you sure you want to reject this request?</Label>
              <PopoverClose className="ms-auto space-x-1">
                <Button
                  onClick={() => rejectReq(recruiter._id)}
                  size={"sm"}
                  className="bg-red-500/20 text-red-500 hover:bg-red-500/50 hover:text-white"
                >
                  confirm
                </Button>
              </PopoverClose>
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => assignRec(recruiter._id)}
            variant={"default"}
            className="w-full border border-green-500/60 bg-green-500/10 text-green-500/60 hover:bg-green-500/30 hover:text-white"
          >
            assign
          </Button>
        </div>
      </div>
    </div>
  );
};
