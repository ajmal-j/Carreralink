import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import Markdown from "@/components/Utils/Markdown";
import { formatMoney } from "@/lib/utils";
import { BookmarkIcon, CheckIcon, ClockIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

interface JobSinglePageProps {
  params: { id: string };
}

const job = {
  title: "Data Analyst Intern",
  company: {
    id: "company_id_2",
    name: "Apple",
    logo: "https://images.crowdspring.com/blog/wp-content/uploads/2022/08/18131304/apple_logo_black.svg_.png",
  },
  type: "internship",
  category: "IT",
  officeLocation: "Cupertino, California, United States",
  location: "hybrid",
  openings: "2",
  status: "open",
  isPaused: false,
  description:
    "# Software Engineer\n\n## Company Overview\nOur company is a leading technology firm based in San Francisco, dedicated to revolutionizing the digital landscape. We specialize in developing cutting-edge software solutions that empower businesses across various industries to thrive in today's dynamic market.\n\n## Job Description\nAs a Software Engineer at our company, you will play a pivotal role in the design, development, and implementation of innovative software solutions. You will collaborate with a dynamic team of engineers and contribute to the entire software development lifecycle, from concept to deployment.\n\n## Responsibilities\n- Design, develop, and maintain high-quality software solutions that meet the needs of our clients.\n- Collaborate with cross-functional teams to define requirements and translate them into technical specifications.\n- Write clean, efficient, and maintainable code following best practices.\n- Conduct thorough testing and debugging to ensure the reliability and scalability of our software products.\n- Stay updated on emerging technologies and trends in software development to continuously improve our processes and products.\n\n## Requirements\n- Bachelor's degree in Computer Science, Engineering, or a related field.\n- Proven experience in software development, preferably in a fast-paced environment.\n- Proficiency in programming languages such as JavaScript, Node.js, and React.\n- Solid understanding of software engineering principles, design patterns, and algorithms.\n- Excellent problem-solving skills and attention to detail.\n- Strong communication and teamwork abilities.\n\n## Benefits\n- Competitive salary with performance-based bonuses.\n- Comprehensive health benefits package.\n- Flexible work hours and remote work options.\n- Opportunities for career growth and professional development.\n- Dynamic and collaborative work environment.\n\n## How to Apply\nIf you're passionate about leveraging technology to drive innovation and eager to join a dynamic team of professionals, we'd love to hear from you! Please submit your resume and a cover letter outlining your relevant experience and why you're interested in this position.\n\n---\n\n*Note: This job description is intended to convey information essential to understanding the scope of the position and is not exhaustive. Other duties may be assigned.*",
  skills: [
    "SQL",
    "Python",
    "Data Visualization",
    "Machine Learning",
    "Tableau",
    "PowerBI",
    "Tableau",
  ],
  pay: {
    maximum: 30000,
    minimum: 20000,
    rate: "Monthly",
  },
};

export default function JobSinglePage({ params: { id } }: JobSinglePageProps) {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="mt-6 ps-2 text-center text-xl md:text-3xl">{job.title}</h1>
      <div className="mt-6 flex w-full flex-wrap  gap-3">
        <Link href={`/companies/${job.company.id}`} className="w-full sm:w-min">
          <div className="my-auto flex size-[70px] justify-center gap-3 rounded-full border border-background/10 bg-white shadow-xl md:size-[90px] ">
            <Image
              className="rounded-full object-contain object-center"
              src={job.company.logo}
              alt="Company logo"
              width={100}
              height={100}
            />
          </div>
        </Link>
        <div className="flex-1">
          <h1 className="pb-2 text-xl">{job.company.name}</h1>
          <p className="text-sm capitalize text-foreground/70">{job.type}</p>
          {job.location !== "remote" && job.officeLocation ? (
            <p className="text-sm text-foreground/70">
              {job.location} : {job.officeLocation} .
            </p>
          ) : (
            <p className="text-sm text-foreground/70">{job.location}</p>
          )}
          <p>
            {job.pay.rate} : ₹ {formatMoney(job.pay.minimum)} -{" "}
            {formatMoney(job.pay.maximum)}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <PrimaryButton className="px-3">
            <span className="flex items-center gap-1">
              <span className="hidden ps-2 md:block">Apply</span> <CheckIcon />
            </span>
          </PrimaryButton>
          <SecondaryButton className="px-3">
            <span className="flex items-center gap-1">
              <span className="hidden ps-2 md:block">Save</span>{" "}
              <BookmarkIcon />
            </span>
          </SecondaryButton>
        </div>
      </div>
      <p className="ms-auto mt-[-10px] flex items-center gap-1 text-sm text-foreground/60">
        <ClockIcon /> 1 day ago
      </p>
      <article>
        <div>
          <ul className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-3 ">
            <span className="text-lg font-semibold text-foreground/90">
              Skills :
            </span>
            {job.skills.map((skill, index) => (
              <li
                className="flex max-w-[200px] flex-grow cursor-pointer items-center justify-center rounded-full border border-foreground/40 px-4 py-1.5 text-sm capitalize transition-all duration-150 hover:bg-foreground/10 lg:text-base "
                key={index}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <h1 className="mb-4 text-2xl font-semibold">Job Description : </h1>
        <Markdown>{job.description}</Markdown>
      </article>
    </main>
  );
}
