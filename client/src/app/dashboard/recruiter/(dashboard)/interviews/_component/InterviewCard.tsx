import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cancelReasons } from "@/constants";
import { formatTime, isTwoDaysLater } from "@/lib/utils";
import { cancelInterview } from "@/services/interview.service";
import { IInterview } from "@/types/interview";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CircleHelp, LucideNotebookText, User } from "lucide-react";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import MoreOptions from "./MoreOptions";

const cancelAction = async (value: FormData) => {
  "use server";
  try {
    value.append("cancelledBy", "interviewer");
    const token = cookies().get("userToken")?.value || "";
    const data: Record<string, any> = {};
    value.forEach((value, key) => {
      data[key] = value;
    });
    await cancelInterview({
      token,
      data,
    });
    revalidatePath(`/dashboard/recruiter/interviews`);
  } catch (error) {
    console.log(error);
  }
};

export function InterviewCard({ interview }: { interview: IInterview }) {
  return (
    <div className="flex cursor-pointer gap-3 rounded-xl px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-foreground/10">
      <Avatar className="size-14">
        <AvatarImage src={interview.applicant.profile} />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1
            className={`font-bold ${interview.status === "cancelled" && "text-foreground/80 line-through"}`}
          >
            {format(interview.startDate, "MMM dd, yyyy")} at{" "}
            {formatTime(interview.time)}
          </h1>
          {interview.agenda && (
            <Popover>
              <PopoverTrigger>
                <LucideNotebookText size={16} />
              </PopoverTrigger>
              <PopoverContent>
                <h1 className="mb-2 text-sm text-foreground/70">agenda :</h1>
                {interview.agenda}
              </PopoverContent>
            </Popover>
          )}
        </div>

        <p className="text-sm text-foreground/70">
          <Link href={`/dashboard/recruiter/jobs/${interview.job._id}`}>
            {interview.job.title}
          </Link>
          <span className="px-1">position with</span>
          <Link
            href={`/dashboard/recruiter/interviews/applicant/${interview.applicant.username}`}
          >
            {interview.applicant.username}
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <MoreOptions interview={interview} />
        {interview.status === "cancelled" ? (
          <div className="flex flex-wrap items-start gap-2">
            <Button size="sm" variant={"destructive"}>
              {interview.status}
            </Button>
            <Popover>
              <PopoverTrigger>
                <CircleHelp size={17} />
              </PopoverTrigger>
              <PopoverContent>
                <h1 className="mb-2 text-sm text-foreground/70">Reason :</h1>
                <p className="px-2">{interview.cancelled.reason}.</p>
                <p className="mt-2 text-end text-sm text-foreground/70">
                  cancelled by{" "}
                  {interview.cancelled.cancelledBy === "interviewer"
                    ? "you"
                    : "Interviewer"}
                </p>
              </PopoverContent>
            </Popover>
          </div>
        ) : interview.status === "scheduled" ? (
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <Popover>
              <PopoverTrigger className="mb-auto w-full">
                <Button variant={"destructive"} className="w-full" size={"sm"}>
                  cancel
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[300px]">
                <h1 className="text-sm">
                  Are you sure you want to cancel this interview?
                </h1>
                <form
                  action={cancelAction}
                  className="mt-4 flex flex-col gap-2 text-sm"
                  encType="multipart/form-data"
                >
                  <input type="hidden" name="interview" value={interview._id} />
                  <Select name="reason" defaultValue="Technical Issues">
                    <SelectTrigger className="w-full border-foreground/40">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {cancelReasons.map((reason, index) => (
                        <SelectItem key={index} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="destructive">confirm</Button>
                </form>
              </PopoverContent>
            </Popover>
            <PrimaryButton
              href={`/join/${interview._id}`}
              disabled={
                new Date(interview.startDate) > new Date() ||
                isTwoDaysLater(interview.startDate)
              }
              size="sm"
            >
              {isTwoDaysLater(interview.startDate) ? "expired" : "join"}
            </PrimaryButton>
          </div>
        ) : (
          <Button size="sm" variant={"secondary"}>
            {interview.status}
          </Button>
        )}
      </div>
    </div>
  );
}
