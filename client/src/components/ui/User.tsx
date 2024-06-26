import PrimaryButton from "@/components/Buttons/PrimaryButton";
import NotFound from "@/components/Custom/NotFound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/services/user.service";
import { IUser } from "@/store/reducers/user.slice";
import {
  BackpackIcon,
  EyeOpenIcon,
  FileIcon,
  LinkBreak2Icon,
  PersonIcon,
  WidthIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import BackButton from "../Buttons/BackButton";

export default async function User({ username }: { username: string }) {
  let user: IUser | null = null;
  try {
    if (!username || username === "favicon.ico")
      return <NotFound title="User not found." />;
    const response = await getUser(username);
    user = response?.data;
  } catch (error) {
    console.log(error);
  }
  if (!user) return <NotFound title="User not found." />;
  return (
    user && (
      <article className="mb-10 md:px-5">
        <BackButton />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative mb-1 mt-5 w-min">
              <Avatar className="size-24 md:size-32">
                <AvatarImage
                  src={user?.profile}
                  alt="profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  <PersonIcon className="size-5" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-auto w-full pb-2 ps-2 text-foreground/70">
              <h1 className="font-montserrat text-2xl capitalize text-foreground">
                {user?.username}
              </h1>
              <p className="capitalize">{user?.currentStatus}</p>
              <p className="capitalize">{user?.workingAt}</p>
              <p className="capitalize">{user?.place}</p>
              <p>
                <span className="font-semibold text-foreground">Contact :</span>{" "}
                {user?.email} , {user?.contact}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {user?.resume?.visible && user?.resume?.resumes.length && (
            <div className="flex gap-2">
              <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
                <FileIcon className="size-6 text-white" />
              </span>
              <div className="flex-1">
                <h1>Resume</h1>
                <span className="text-foreground/70">View resume as PDF</span>
              </div>
              <div className="flex h-min gap-2 place-self-center">
                <Link
                  href={user?.resume?.resumes[user.resume.primary].url}
                  target="_blank"
                >
                  <PrimaryButton className="rounded-sm">
                    <div className="flex items-center gap-1 pe-3 ps-3 ">
                      <EyeOpenIcon />
                      <span className="hidden md:block">view</span>
                    </div>
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          )}

          {user?.portfolioLink && (
            <div className="flex gap-2">
              <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
                <LinkBreak2Icon className="size-6 text-white" />
              </span>

              <div className="flex-1">
                <h1>Portfolio</h1>
                <span className="text-foreground/70 underline">
                  <Link target="_blank" href={user?.portfolioLink as string}>
                    {user?.portfolioLink?.length > 16
                      ? (user?.portfolioLink as string)
                          .substring(0, 16)
                          .concat("...")
                      : user?.portfolioLink}
                  </Link>
                </span>
              </div>
            </div>
          )}
        </div>

        {!!user?.skills?.length && (
          <div className="mt-10">
            <h1 className="pb-2 font-montserrat text-2xl text-foreground">
              Skills
            </h1>
            <div className="flex flex-wrap gap-3 pt-3">
              {user?.skills.map((skill: string, index: number) => (
                <PrimaryButton className="w-min text-nowrap px-5" key={index}>
                  {skill}
                </PrimaryButton>
              ))}
            </div>
          </div>
        )}

        {!!user?.experience?.length && (
          <div className="mt-10">
            <div className="flex items-center justify-between gap-3 pb-5">
              <h1 className="font-montserrat text-2xl text-foreground">
                Experience
              </h1>
            </div>
            <div className="mt-4 flex flex-col gap-5">
              {user?.experience.map((exp, index) => (
                <div key={index} className="flex gap-2">
                  <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
                    <BackpackIcon className="size-6 text-white" />
                  </span>
                  <div className="flex-1">
                    <h1 className="capitalize">
                      {exp.position} at {exp.companyName}
                    </h1>
                    <span className="flex items-center gap-2 text-foreground/70">
                      {new Date(exp.startDate).toLocaleDateString()}
                      <WidthIcon className="text-foreground" />
                      {exp.endDate === "Present"
                        ? "Present"
                        : new Date(exp.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!user?.education?.length && (
          <div className="mt-10">
            <div className="flex items-center justify-between gap-3 pb-5">
              <h1 className="font-montserrat text-2xl text-foreground">
                Education
              </h1>
            </div>
            <div className="mt-4 flex flex-col gap-5">
              {user?.education.map((edu, index) => (
                <div key={index} className="flex gap-2">
                  <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="h-6 w-6 text-white"
                    >
                      <path
                        fill="currentColor"
                        d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z"
                      />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <h1 className="">
                      {edu.degree} from {edu.institution}
                    </h1>
                    <span className="flex items-center gap-2 text-foreground/70">
                      {new Date(edu.startDate).toLocaleDateString()}
                      <WidthIcon className="text-foreground" />
                      {edu.endDate === "Present"
                        ? "Present"
                        : new Date(edu.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          {user?.about && (
            <>
              <h1 className="text-center font-montserrat text-2xl text-foreground">
                About
              </h1>
              <p className="mx-auto max-w-[850px] text-foreground/80 before:ms-11 before:content-['“'] after:content-['”']">
                {user?.about}
              </p>
            </>
          )}
        </div>
      </article>
    )
  );
}
