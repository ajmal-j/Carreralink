import PrimaryButton from "@/components/Buttons/PrimaryButton";
import NotFound from "@/components/Custom/NotFound";
import { PaginationComponent } from "@/components/Custom/Pagination";
import RefreshPage from "@/components/Custom/RefreshPage";
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
import { cancelInterview, getByUser } from "@/services/interview.service";
import { IInterview } from "@/types/interview";
import { IResponseData } from "@/types/paginateResponse";
import { format } from "date-fns";
import { Building2, CircleHelp, LucideNotebookText } from "lucide-react";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";

interface PageProps {
  searchParams: {
    p?: number;
  };
}

const cancelAction = async (value: FormData) => {
  "use server";
  try {
    value.append("cancelledBy", "applicant");
    const token = cookies().get("userToken")?.value || "";
    const data: Record<string, any> = {};
    value.forEach((value, key) => {
      data[key] = value;
    });
    await cancelInterview({
      token,
      data,
    });
    revalidatePath(`/my-jobs/interview`);
  } catch (error) {
    console.log(error);
  }
};

export default async function Interview({
  searchParams: { p = 1 },
}: PageProps) {
  const token = cookies().get("userToken")?.value || "";
  const query = { p };
  let interviews: IInterview[] = [];
  let options: Omit<IResponseData, "docs"> = {} as Omit<IResponseData, "docs">;
  try {
    const response = await getByUser({
      token,
      query,
    });
    const { docs, ...rest } = response?.data;
    interviews = docs;
    options = rest;
  } catch (error) {
    return <RefreshPage />;
  }
  return (
    <div>
      {!!interviews.length ? (
        <div className="flex flex-col gap-2">
          <span className="ms-2 text-foreground/70">
            Total {options?.totalDocs || 0}
          </span>
          {interviews.map((interview) => (
            <InterviewCard key={interview._id} interview={interview} />
          ))}
          <PaginationComponent
            defaultValues={query}
            options={options}
            path="/my-jobs"
          />
        </div>
      ) : (
        <NotFound title="No interviews." />
      )}
    </div>
  );
}

function InterviewCard({ interview }: { interview: IInterview }) {
  return (
    <div className="flex cursor-pointer gap-3 rounded-xl px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-foreground/10">
      <Avatar className="size-14">
        <AvatarImage src={interview.job.company.logo} />
        <AvatarFallback>
          <Building2 />
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
        <Link href={`/jobs/${interview.job._id}`} className="hover:underline">
          <p className="text-sm text-foreground/70">
            {interview.job.title} at {interview.job.company.name}
          </p>
        </Link>
        <p className="flex gap-1 text-sm text-foreground/70">
          <span className="text-nowrap">Interviewer :</span>
          <Link
            href={`/${interview.interviewer.username}`}
            className="underline"
          >
            {interview.interviewer.username}
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-1">
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
                  {interview.cancelled.cancelledBy === "applicant"
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
