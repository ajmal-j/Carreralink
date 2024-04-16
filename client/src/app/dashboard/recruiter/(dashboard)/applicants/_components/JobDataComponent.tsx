import Separator from "@/components/Custom/Separator";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import { IJob } from "@/types/jobs";
import { formatDistanceToNow } from "date-fns";


export function JobDataComponent({ jobData }: { jobData: IJob }) {
    return (
      <div className="mb-10">
        <div className="mb-7 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold lg:text-4xl">
              {jobData.title}
            </h1>
            <span className="text-sm text-foreground/70">
              {jobData.officeLocation
                ? `${jobData.officeLocation}/${jobData.workSpace}`
                : jobData.workSpace}
            </span>
          </div>
          <div>
            <Button variant="outline">action</Button>
          </div>
        </div>
        <h1 className="text-xl font-semibold">Job detail&apos;s</h1>
        <div className="mt-5 flex flex-col gap-2">
          <Separator className="h-[2px] bg-foreground/50" />
          <div className="flex items-center">
            <div className="w-full flex-1">
              <h1 className="text-sm text-foreground/70">Posted</h1>
              <span>{formatDistanceToNow(new Date(jobData.createdAt))}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-sm text-foreground/70">Applicant&apos;s</h1>
              <span>{jobData.applicants}</span>
            </div>
          </div>
          <Separator className="h-[2px] bg-foreground/50" />
          <div className="flex items-center">
            <div className="w-full flex-1">
              <h1 className="text-sm text-foreground/70">Type</h1>
              <span>{jobData.type}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-sm text-foreground/70">Status</h1>
              <span>{jobData.status}</span>
            </div>
          </div>
          <Separator className="h-[2px] bg-foreground/50" />
          <div className="flex items-center">
            <div className="w-full flex-1">
              <h1 className="text-sm text-foreground/70">Pay</h1>
              <span>
                <span className="me-2 text-foreground/70">
                  {jobData?.pay?.rate} :
                </span>
                ₹ {jobData?.pay?.minimum && formatMoney(jobData?.pay?.minimum)} -{" "}
                {formatMoney(jobData?.pay?.maximum)}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-sm text-foreground/70">Opening&apos;s</h1>
              <span>{jobData.openings}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  