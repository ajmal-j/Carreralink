import Wrapper from "@/components/Wrapper";
import Main from "@/components/Main";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import PrimaryButton from "@/components/PrimaryButton";
import FeaturedJobs from "@/components/FeaturedJobs";
import { ThreeDCard } from "@/components/ThreeDCard";
import { SparklesTitle } from "@/components/SparklingTitle";
import { InfiniteMovingCard } from "@/components/MovingCards";

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
          <form
            action="/jobs"
            className="mx-auto flex max-w-[400px] items-center justify-center"
          >
            <div className="flex w-full items-center justify-between rounded-full bg-background px-2 py-[5px] font-montserrat shadow-roundedPrimaryShadow">
              <div className="flex items-center">
                <MagnifyingGlassIcon className="ms-2 size-5" />
                <input
                  placeholder="Search for jobs..."
                  name="q"
                  className="bg-transparent px-2 py-2 outline-none ring-0 placeholder:text-sm"
                />
              </div>
              <PrimaryButton className="w-min px-6" type="submit">
                Search
              </PrimaryButton>
            </div>
          </form>
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
