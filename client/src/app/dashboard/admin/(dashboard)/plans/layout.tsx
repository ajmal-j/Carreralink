import PrimaryButton from "@/components/Buttons/PrimaryButton";
import DashboardWrapper from "@/components/Layout/DashboardWrapper";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardWrapper
      title="Plan's"
      components={
        <Link href="/dashboard/admin/plans/new">
          <PrimaryButton
            className="w-min gap-1 text-nowrap px-4 text-sm"
            icon={<PlusIcon size={16} />}
          >
            New Plan
          </PrimaryButton>
        </Link>
      }
    >
      {children}
    </DashboardWrapper>
  );
}
