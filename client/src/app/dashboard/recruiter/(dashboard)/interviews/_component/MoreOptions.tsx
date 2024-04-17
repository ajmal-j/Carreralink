import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IInterview } from "@/types/interview";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { EditInterviewForm } from "./_form/EditInterviewForm";
import {
  updateInterviewData,
  updateInterviewStatus,
} from "@/services/interview.service";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Checkbox } from "@/components/ui/checkbox";

const formAction = async (values: any, id: string) => {
  "use server";
  const data = {
    ...values,
    interview: id,
  };
  const token = cookies().get("userToken")?.value || "";
  try {
    await updateInterviewData({
      data,
      token,
    });
    revalidatePath(`/dashboard/recruiter/interviews`);
  } catch (error) {
    console.log(error);
  }
};

const markAsCompleted = async (formData: FormData) => {
  "use server";
  const data: Record<string, any> = {};
  const token = cookies().get("userToken")?.value || "";
  formData.forEach((value, key) => {
    data[key] = value;
  });
  if (data["status"] === "on") data["status"] = "completed";
  try {
    await updateInterviewStatus({
      data,
      token,
    });
    revalidatePath(`/dashboard/recruiter/interviews`);
  } catch (error) {
    console.log(error);
  }
};

export default function MoreOptions({ interview }: { interview: IInterview }) {
  return (
    <div className="mb-1 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="ms-auto flex size-6 items-center justify-center rounded-full border bg-foreground/10 transition-colors duration-200 ease-in-out hover:bg-foreground/30">
          <DotsVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            <Link
              className="block w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-150 ease-in-out hover:bg-foreground/10"
              href={`/dashboard/recruiter/jobs/${interview.job._id}`}
            >
              Job
            </Link>
            <Link
              className="block w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-150 ease-in-out hover:bg-foreground/10"
              href={`/dashboard/recruiter/interviews/applicant/${interview.applicant.username}`}
            >
              Applicant
            </Link>
            {interview.status === "scheduled" && (
              <div className="px-3">
                <form action={markAsCompleted} className="space-x-1">
                  <Checkbox name="status" type="submit" id="completed" />
                  <label
                    htmlFor="completed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Completed.
                  </label>
                  <input type="hidden" name="interview" value={interview._id} />
                </form>
              </div>
            )}
          </div>
          <EditInterviewForm
            formAction={formAction}
            status={interview.status}
            id={interview._id}
            defaultValues={{
              startDate: new Date(interview.startDate),
              time: interview.time,
              agenda: interview.agenda,
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
