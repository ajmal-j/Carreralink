import NotFound from "@/components/Custom/NotFound";
import { getMessage } from "@/lib/utils";
import { joinInterview } from "@/services/interview.service";
import { IInterviewUsers, IUserCompany } from "@/types/company";
import { cookies } from "next/headers";
import Meet from "../_component/meet";
import { Suspense } from "react";
import { Loader } from "lucide-react";

export default async function Interview({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  let data: IInterviewUsers = {} as IInterviewUsers;
  let isInterviewer: boolean = false;
  let applicantId: string = "";

  const token = cookies().get("userToken")?.value || "";
  try {
    const response = await joinInterview({
      token,
      id,
    });
    data = response?.data?.user;
    isInterviewer = response?.data?.isInterviewer;
    applicantId = response?.data?.applicantId;
  } catch (error) {
    console.log(error);
    const message = getMessage(error);
    return <NotFound title={message} />;
  }
  if (!data.username)
    return <NotFound title="Something went wrong please try again." />;
  return (
    <div className="flex min-h-screen w-full justify-start">
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        }
      >
        <Meet
          id={id}
          isInterviewer={isInterviewer}
          applicantId={applicantId}
          user={data}
        />
      </Suspense>
    </div>
  );
}
