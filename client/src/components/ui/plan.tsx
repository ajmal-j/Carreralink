import Markdown from "@/components/Custom/Markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Crown, IndianRupee } from "lucide-react";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});
export default function PlanCard({
  plan,
  actions,
}: {
  plan: IPlan;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-grow basis-[300px] flex-col space-y-4 rounded-md border px-3 py-4 duration-200 ease-in-out hover:bg-foreground/5">
      <div>
        <div className="flex items-center justify-between">
          <h1 className={cn("text-xl md:text-2xl", poppins.className)}>
            {plan.name}
          </h1>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger>
                {plan.plan === "premium" ? (
                  <Crown size={18} color="orange" />
                ) : (
                  <Crown size={18} />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{plan.plan} plan.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={cn("flex items-center gap-1", poppins.className)}>
          <IndianRupee className="size-[30px] font-thin md:size-[40px]" />
          <span className="text-[40px] md:text-[55px]">{plan.price}</span>
        </div>
        <Markdown className="px-2">{plan.description}</Markdown>
      </div>
      <div className="flex h-full flex-col justify-end">
        <div className="mt-auto flex items-center justify-end pt-4">
          <span className="text-sm text-foreground/70">
            plan duration: {plan.duration}{" "}
            {plan.duration === 1 ? "month" : "months"}
          </span>
        </div>
        <div className="flex justify-end pt-3">{actions}</div>
      </div>
    </div>
  );
}
