import Image from "next/image";
import {
  BackpackIcon,
  EyeOpenIcon,
  FileIcon,
  LinkBreak2Icon,
  Pencil2Icon,
  PlusIcon,
  Share2Icon,
  WidthIcon,
} from "@radix-ui/react-icons";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Link from "next/link";
import AccentButton from "@/components/Buttons/AccentButton";
import { EditProfile } from "@/components/FormsAndDialog/EditDialog";
import { EditEducation } from "@/components/FormsAndDialog/EditEducation";
import { EditExperience } from "@/components/FormsAndDialog/EditExperience";
import { EditSkill } from "@/components/FormsAndDialog/EditSkill";

const userData = {
  profile:
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  email: "example@example.com",
  currentStatus: "job seeking",
  education: [
    {
      institution: "University of Example",
      degree: "Bachelor of Science",
      startDate: "2026-03-14T18:30:00.000Z",
      endDate: "2026-03-14T18:30:00.000Z",
    },
    {
      institution: "Example College",
      degree: "B.com Degree",
      startDate: "2026-03-14T18:30:00.000Z",
      endDate: "Present",
    },
  ],
  experience: [
    {
      company: "Tech Company",
      position: "Software Engineer",
      startDate: "2026-03-14T18:30:00.000Z",
      endDate: "Present",
    },
    {
      company: "Apple",
      position: "Product Designer",
      startDate: "2026-03-14T18:30:00.000Z",
      endDate: "2027-03-14T18:30:00.000Z",
    },
  ],
  place: "Kozhikode , Kerala , India",
  resumeLink: "https://example.com/resume.pdf",
  role: "user",
  about:
    "I'm a passionate software engineer with experience in full-stack development. I have a strong understanding of web development technologies and can work with a variety of programming languages and frameworks. I'm always looking for new opportunities to learn and grow as a developer. Thank you for considering my profile! Let's connect and discuss how I can help you achieve your goals. I look forward to connecting. Let's build something together!",
  portfolioLink: "https://example.com/portfolio",
  skills: [
    "JavaScript",
    "Java",
    "C++",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
  ],
  savedJobs: [],
  messages: [],
  workingAt: "Product designer at Tech Company",
  username: "Example user",
  contact: 1234567890,
};

export default function Profile() {
  return (
    <article>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="mb-5 w-full">
            <Image
              src={userData.profile}
              width={200}
              height={200}
              className=" max-w-[130px] rounded-full object-cover object-center md:max-w-[200px]"
              alt="Profile Image"
            />
          </div>
          <div className="mt-auto pb-2 text-foreground/70">
            <h1 className="font-montserrat text-2xl text-foreground">
              {userData.username}
            </h1>
            <p className="capitalize">{userData.currentStatus}</p>
            <p className="capitalize">{userData.workingAt}</p>
            <p className="capitalize">{userData.place}</p>
            <p>
              <span className="font-semibold text-foreground">Contact :</span>{" "}
              {userData.email} , {userData.contact}
            </p>
          </div>
        </div>
        <div className="ms-auto mt-auto pb-2">
          <EditProfile
            defaultValues={{
              username: userData.username,
              email: userData.email,
              contact: String(userData.contact),
              place: userData.place,
              currentStatus: userData.currentStatus,
              workingAt: userData.workingAt,
            }}
          >
            <Pencil2Icon className="size-5 cursor-pointer" />
          </EditProfile>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-5">
        <div className="flex gap-2">
          <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
            <FileIcon className="size-6 text-white" />
          </span>
          <div className="flex-1">
            <h1>Resume</h1>
            <span className="text-foreground/70">View resume as PDF</span>
          </div>
          <div className="flex h-min gap-2 place-self-center">
            <PrimaryButton className="rounded-sm">
              <div className="flex items-center gap-1 pe-3 ps-3 ">
                <EyeOpenIcon />
                <span className="hidden md:block">view</span>
              </div>
            </PrimaryButton>
            <SecondaryButton className="rounded-sm">
              <div className="flex items-center gap-1 pe-3 ps-3 ">
                <Share2Icon />
              </div>
            </SecondaryButton>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
            <LinkBreak2Icon className="size-6 text-white" />
          </span>
          <div className="flex-1">
            <h1>Portfolio</h1>
            <span className="text-foreground/70 underline">
              <Link target="_blank" href={userData.portfolioLink as string}>
                {userData.portfolioLink.length > 16
                  ? (userData.portfolioLink as string)
                      .substring(0, 16)
                      .concat("...")
                  : userData.portfolioLink}
              </Link>
            </span>
          </div>
          <div className="flex h-min gap-2 place-self-center">
            <SecondaryButton className="rounded-sm">
              <div className="flex items-center gap-1 pe-3 ps-3 ">
                <Pencil2Icon />
              </div>
            </SecondaryButton>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="pb-2 font-montserrat text-2xl text-foreground">
          Skills
        </h1>
        <div className="flex flex-wrap gap-3 pt-3">
          {userData.skills.map((skill, index) => (
            <PrimaryButton className="w-min px-5" key={index}>
              {skill}
            </PrimaryButton>
          ))}
          <EditSkill defaultValues={userData.skills}>
            <AccentButton className="ms-5 w-min px-3 dark:border-foreground/70 dark:shadow-roundedPrimaryShadow">
              <PlusIcon />
            </AccentButton>
          </EditSkill>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between gap-3 pb-5">
          <h1 className="font-montserrat text-2xl text-foreground">
            Experience
          </h1>
          <EditExperience
            defaultValues={{
              company: "",
              position: "",
              startDate: "",
              endDate: "",
            }}
          >
            <AccentButton className="w-min rounded-sm px-3 dark:border-foreground/70 dark:shadow-roundedPrimaryShadow">
              <PlusIcon />
            </AccentButton>
          </EditExperience>
        </div>
        <div className="mt-4 flex flex-col gap-5">
          {userData.experience.map((exp, index) => (
            <div key={index} className="flex gap-2">
              <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
                <BackpackIcon className="size-6 text-white" />
              </span>
              <div className="flex-1">
                <h1 className="">
                  {exp.position} at {exp.company}
                </h1>
                <span className="flex items-center gap-2 text-foreground/70">
                  {new Date(exp.startDate).toLocaleDateString()}
                  <WidthIcon className="text-foreground" />
                  {exp.endDate === "Present"
                    ? "Present"
                    : new Date(exp.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex h-min gap-2 place-self-center">
                <EditExperience defaultValues={{ ...exp }}>
                  <SecondaryButton className="rounded-sm">
                    <div className="flex items-center gap-1 pe-3 ps-3 ">
                      <Pencil2Icon />
                    </div>
                  </SecondaryButton>
                </EditExperience>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-3 pb-5">
          <h1 className="font-montserrat text-2xl text-foreground">
            Education
          </h1>
          <EditEducation
            defaultValues={{
              institution: "",
              degree: "",
              startDate: "",
              endDate: "",
            }}
          >
            <AccentButton className="w-min rounded-sm px-3 dark:border-foreground/70 dark:shadow-roundedPrimaryShadow">
              <PlusIcon />
            </AccentButton>
          </EditEducation>
        </div>
        <div className="mt-4 flex flex-col gap-5">
          {userData.education.map((edu, index) => (
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
              <div className="flex h-min gap-2 place-self-center">
                <EditEducation defaultValues={{ ...edu }}>
                  <SecondaryButton className="rounded-sm">
                    <div className="flex items-center gap-1 pe-3 ps-3 ">
                      <Pencil2Icon />
                    </div>
                  </SecondaryButton>
                </EditEducation>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-center font-montserrat text-2xl text-foreground">
          About
        </h1>
        <p className="mx-auto max-w-[850px] text-foreground/80 before:ms-11 before:content-['“'] after:content-['”']">
          {userData.about}
        </p>
      </div>
    </article>
  );
}
