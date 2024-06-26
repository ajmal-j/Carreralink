import { LandingPageAccordion } from "@/components/Custom/Accordination";
import Wrapper from "@/components/Custom/Wrapper";
import Search from "@/components/FormsAndDialog/Search";
import FeaturedJobs from "@/components/LandingPage/FeaturedJobs";
import { InfiniteMovingCard } from "@/components/LandingPage/MovingCards";
import { SparklesTitle } from "@/components/LandingPage/SparklingTitle";
import { ThreeDCard } from "@/components/LandingPage/ThreeDCard";
import { JobSkeleton } from "@/components/Layout/JobsSkeleton";
import Main from "@/components/Layout/Main";
import MainText from "@/components/Layout/MainText";
import UserPlans from "@/components/ui/UserPlans";
import { Suspense } from "react";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

export default async function Home() {
  return (
    <Wrapper>
      <Main className="relative">
        <div
          className="absolute inset-0 overflow-hidden bg-[url('/bg.svg')] bg-contain bg-scroll bg-top bg-no-repeat blur-[120px]
        "
        ></div>
        <article className="relative z-10 flex flex-col gap-10">
          <MainText />
          <Search action="/jobs" />
          <Suspense fallback={<JobSkeleton />}>
            <FeaturedJobs />
          </Suspense>
          <span className="block pb-3 text-center text-2xl">
            Popular Job Categorie&apos;s
          </span>
          <InfiniteMovingCard />
          <div className="mt-10">
            <SparklesTitle />
            <ThreeDCard />
          </div>
          <UserPlans {...{ stripePublishableKey }} />
          <LandingPageAccordion />
        </article>
      </Main>
    </Wrapper>
  );
}
