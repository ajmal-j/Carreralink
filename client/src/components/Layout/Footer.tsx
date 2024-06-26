import { cn } from "@/lib/utils";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TokensIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Title from "../Custom/Title";
import Link from "next/link";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("mb-5 mt-10 w-full  py-3 pb-7 md:mt-16", className)}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-2  lg:px-0">
        <div className="inline-flex items-center">
          <Title />
        </div>
        <div className="flex w-full flex-wrap items-center justify-end gap-2">
          <span className="text-nowrap text-sm font-medium">
            Ready to Get Started ?
          </span>
          <button
            type="button"
            className="ml-2 rounded-md border bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Get Started
          </button>
        </div>
      </div>
      <hr className="my-8" />
      <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 px-4 md:flex-row">
        <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-foreground/80 ">
              Quick Links
            </p>
            <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
              <li>
                <Link href={"/profile"}>Profile</Link>
              </li>
              <li>
                <Link href={"/companies"}>Companies</Link>
              </li>
              <li>
                <Link href={"/jobs"}>Jobs</Link>
              </li>

              <li>
                <Link href={"/plans"}>Plan&apos;s</Link>
              </li>
              <li>
                <Link href={"/my-jobs"}>My Job&apos;s</Link>
              </li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-foreground/80 ">
              Dashboard
            </p>
            <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
              <li>
                <Link href={"/dashboard/recruiter"}>Hire</Link>
              </li>
              <li>
                <Link href={"/dashboard/company"}>Company Dashboard</Link>
              </li>
              <li>
                <Link href={"/messages"}>Messages</Link>
              </li>
              <li>
                <Link href={"/my-jobs/applied"}>Applied Jobs</Link>
              </li>
              <li>
                <Link href={"/my-jobs/interview"}>Interviews</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4 px-4 py-4">
        <InstagramLogoIcon className="size-6 cursor-pointer text-foreground/60 hover:text-foreground" />
        <TwitterLogoIcon className="size-6 cursor-pointer text-foreground/60 hover:text-foreground" />
        <GitHubLogoIcon className="size-6 cursor-pointer text-foreground/60 hover:text-foreground" />
        <LinkedInLogoIcon className="size-6 cursor-pointer text-foreground/60 hover:text-foreground" />
      </div>
    </footer>
  );
}
