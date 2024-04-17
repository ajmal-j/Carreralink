import NotFound from "@/components/Custom/NotFound";
import { getMessage } from "@/lib/utils";
import { joinInterview } from "@/services/interview.service";
import { IUserCompany } from "@/types/company";
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
  let data: IUserCompany = {} as IUserCompany;
  const token = cookies().get("userToken")?.value || "";
  try {
    const response = await joinInterview({
      token,
      id,
    });
    data = response.data;
  } catch (error) {
    console.log(error);
    const message = getMessage(error);
    return <NotFound title={message} />;
  }
  if (!data.username)
    return <NotFound title="Something went wrong please try again." />;
  return (
    <div className="flex min-h-screen w-full items-start justify-center pt-3">
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        }
      >
        <Meet id={id} user={data} />
      </Suspense>
    </div>
  );
}
