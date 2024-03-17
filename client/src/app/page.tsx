import Wrapper from "@/components/Utils/Wrapper";
import Main from "@/components/Layout/Main";
import FeaturedJobs from "@/components/LandingPage/FeaturedJobs";
import { ThreeDCard } from "@/components/LandingPage/ThreeDCard";
import { SparklesTitle } from "@/components/LandingPage/SparklingTitle";
import { InfiniteMovingCard } from "@/components/LandingPage/MovingCards";
import Search from "@/components/FormsAndDialog/Search";

export default function Home() {
  return (
    <Wrapper>
      <Main className="relative">
        <div
          className="absolute inset-0 overflow-hidden bg-[url('/bg.svg')] bg-contain bg-scroll bg-top bg-no-repeat blur-[120px]
        "
        ></div>
        <article className="relative z-10">
          <div className="mx-auto flex max-w-[600px] flex-col gap-1 py-16">
            <span className="block text-center text-4xl">
              Job hunting made easy.
              <br />
              Your gateway to professional success!
            </span>
          </div>
          <Search action="/jobs" />
          <FeaturedJobs />
          <span className="block pb-3 pt-10 text-center text-2xl">
            Popular Job Categorie&apos;s
          </span>
          <InfiniteMovingCard />
          <SparklesTitle />
          <ThreeDCard />
        </article>
      </Main>
    </Wrapper>
  );
}
