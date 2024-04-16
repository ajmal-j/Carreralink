import Wrapper from "@/components/Custom/Wrapper";
import Main from "@/components/Layout/Main";
import FeaturedJobs from "@/components/LandingPage/FeaturedJobs";
import { ThreeDCard } from "@/components/LandingPage/ThreeDCard";
import { SparklesTitle } from "@/components/LandingPage/SparklingTitle";
import { InfiniteMovingCard } from "@/components/LandingPage/MovingCards";
import Search from "@/components/FormsAndDialog/Search";
import { getSkillsAndCategories } from "@/services/company.service";
import MainText from "@/components/Layout/MainText";

export default async function Home() {
  const response = await getSkillsAndCategories();
  const { category = [] } = response?.data[0];
  const data = category.slice(0, 10);
  return (
    <Wrapper>
      <Main className="relative">
        <div
          className="absolute inset-0 overflow-hidden bg-[url('/bg.svg')] bg-contain bg-scroll bg-top bg-no-repeat blur-[120px]
        "
        ></div>
        <article className="relative z-10">
          <MainText />
          <Search action="/jobs" />
          <FeaturedJobs />
          <span className="block pb-3 pt-10 text-center text-2xl">
            Popular Job Categorie&apos;s
          </span>
          <InfiniteMovingCard categories={data} />
          <SparklesTitle />
          <ThreeDCard />
        </article>
      </Main>
    </Wrapper>
  );
}
