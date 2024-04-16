import PrimaryButton from "@/components/Buttons/PrimaryButton";
import NotFound from "@/components/Custom/NotFound";
import { PaginationComponent } from "@/components/Custom/Pagination";
import RefreshPage from "@/components/Custom/RefreshPage";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
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
import {
  cancelInterview,
  getByRecruiter,
  getByUser,
} from "@/services/interview.service";
import { IInterview } from "@/types/interview";
import { IResponseData } from "@/types/paginateResponse";
import { format } from "date-fns";
import { Building2, CircleHelp, LucideNotebookText, User } from "lucide-react";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { InterviewCard } from "./_component/InterviewCard";

interface PageProps {
  searchParams: {
    p?: number;
  };
}

export default async function Interviews({
  searchParams: { p = 1 },
}: PageProps) {
  const token = cookies().get("userToken")?.value || "";
  const query = { p };
  let interviews: IInterview[] = [];
  let options: Omit<IResponseData, "docs"> = {} as Omit<IResponseData, "docs">;
  try {
    const response = await getByRecruiter({
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
    <DashboardWrapper title="Interview's">
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
    </DashboardWrapper>
  );
}
