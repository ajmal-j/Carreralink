import { cn } from "@/lib/utils";
import {
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  UserSearch,
  Users,
} from "lucide-react";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const titles: Record<string, string> = {
  totalJobs: "Total Job's",
  openJobs: "Open Job's",
  totalApplied: "Total Applicant's",
  totalRecruiters: "Total Recruiter's",
  totalCompanies: "Total Company's",
  totalUsers: "Total User's",
  totalUpcomingInterviews: "Total Upcoming Interviews",
};

const icons: Record<keyof typeof titles, ReactNode> = {
  totalJobs: <Briefcase className="mt-3 text-primaryColor" />,
  openJobs: <BriefcaseBusiness className="mt-3 text-primaryColor" />,
  totalApplied: <UserSearch className="mt-3 text-primaryColor" />,
  totalRecruiters: <Users className="mt-3 text-primaryColor" />,
  totalUsers: <Users className="mt-3 text-primaryColor" />,
  totalCompanies: <Building2 className="mt-3 text-primaryColor" />,
  totalUpcomingInterviews: <CalendarDays className="mt-3 text-primaryColor" />,
};

export default function DashboardPills({
  counts,
}: {
  counts: Record<string, number>;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
      {Object?.entries(counts).map(([key, value]) => (
        <div
          key={key}
          className={cn(
            "flex min-w-[150px] max-w-full flex-grow flex-col items-start gap-4 rounded-md bg-violet-600/20 px-6 py-3 md:gap-6",
            poppins.className,
          )}
        >
          <h1>{titles[key] ?? key + " data"}</h1>
          <p className="text-2xl font-bold md:text-4xl">{value}</p>
          {icons[key] ?? null}
        </div>
      ))}
    </div>
  );
}
