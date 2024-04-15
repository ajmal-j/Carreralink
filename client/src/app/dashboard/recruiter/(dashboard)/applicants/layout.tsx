import { ReactNode, Suspense } from "react";
import ApplicantsList from "./Applicants";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <DashboardWrapper className="max-w-[1300px]" title="Applicants">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="min-w-[500px]">{children}</div>
        <div className="w-full">
          <Suspense
            fallback={
              <div className="text-center text-foreground/60">Loading...</div>
            }
          >
            <ApplicantsList />
          </Suspense>
        </div>
      </div>
    </DashboardWrapper>
  );
}
