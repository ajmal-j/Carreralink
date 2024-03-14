import Wrapper from "@/components/Utils/Wrapper";
import Main from "@/components/Layout/Main";
import Image from "next/image";
import {
  BackpackIcon,
  EyeOpenIcon,
  FileIcon,
  LinkBreak2Icon,
  Pencil1Icon,
  PlusIcon,
  WidthIcon,
} from "@radix-ui/react-icons";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Link from "next/link";
import AccentButton from "@/components/Buttons/AccentButton";

const sampleUserData = {
  profile:
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  email: "example@example.com",
  currentStatus: "job seeking",
  education: [
    {
      institution: "University of Example",
      degree: "Bachelor of Science",
      startDate: "2020-01-01",
      endDate: "2022-01-01",
    },
    {
      institution: "Example College",
      degree: "B.com Degree",
      startDate: "2020-01-01",
      endDate: "2022-01-01",
    },
  ],
  experience: [
    {
      company: "Tech Company",
      position: "Software Engineer",
      startDate: "2020-01-01",
      endDate: "Present",
      description: "Worked on various projects involving web development.",
    },
    {
      company: "Apple",
      position: "Product Designer",
      startDate: "2020-01-01",
      endDate: "2022-01-01",
      description: "Worked on various projects involving web development.",
    },
  ],
  place: "City, Country",
  resumeLink: "https://example.com/resume.pdf",
  role: "user",
  about:
    "I'm a passionate software engineer with experience in full-stack development. I have a strong understanding of web development technologies and can work with a variety of programming languages and frameworks. I'm always looking for new opportunities to learn and grow as a developer. Thank you for considering my profile! Let's connect and discuss how I can help you achieve your goals. I look forward to connecting. Let's build something together!",
  portfolioLink: "https://example.com/portfolio",
  skills: [
    "JavaScript",
    "Node.js",
    "React",
    "MongoDB",
    "Python",
    "Java",
    "C++",
  ],
  savedJobs: [],
  messages: [],
  workingAt: "Product designer at Tech Company",
  username: "Example user",
  contact: 1234567890,
};

export default function Profile() {
  return (
    <Wrapper>
      <Main className="px-2">
        <article className="mt-5 px-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <Image
                src={sampleUserData.profile}
                width={130}
                height={130}
                className="rounded-full object-cover object-center"
                alt="Profile Image"
              />
              <div className="mt-auto pb-2 text-foreground/70">
                <h1 className="font-montserrat text-2xl text-foreground">
                  {sampleUserData.username}
                </h1>
                <p className="capitalize">{sampleUserData.currentStatus}</p>
                <p className="capitalize">{sampleUserData.workingAt}</p>
                <p className="capitalize">{sampleUserData.place}</p>
                <p>
                  <span className="font-semibold text-foreground">
                    Contact :
                  </span>{" "}
                  {sampleUserData.email} , {sampleUserData.contact}
                </p>
              </div>
            </div>
            <div className="ms-auto mt-auto pb-2">
              <SecondaryButton className="rounded-sm">
                <div className="flex items-center gap-1 py-1 pe-4 ps-3">
                  <Pencil1Icon />
                  Edit
                </div>
              </SecondaryButton>
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
                  <div className="flex items-center gap-1 pe-3 ps-3 md:pe-4">
                    <EyeOpenIcon />
                    <span className="hidden md:block">view</span>
                  </div>
                </PrimaryButton>
                <SecondaryButton className="rounded-sm">
                  <div className="flex items-center gap-1 pe-3 ps-3 md:pe-4">
                    <Pencil1Icon />
                    <span className="hidden md:block">Edit</span>
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
                  <Link
                    target="_blank"
                    href={sampleUserData.portfolioLink as string}
                  >
                    {sampleUserData.portfolioLink.length > 16
                      ? (sampleUserData.portfolioLink as string)
                          .substring(0, 10)
                          .concat("...")
                      : sampleUserData.portfolioLink}
                  </Link>
                </span>
              </div>
              <div className="flex h-min gap-2 place-self-center">
                <PrimaryButton className="rounded-sm">
                  <div className="flex items-center gap-1 pe-3 ps-3 md:pe-4">
                    <EyeOpenIcon />
                    <span className="hidden md:block">view</span>
                  </div>
                </PrimaryButton>
                <SecondaryButton className="rounded-sm">
                  <div className="flex items-center gap-1 pe-3 ps-3 md:pe-4">
                    <Pencil1Icon />
                    <span className="hidden md:block">Edit</span>
                  </div>
                </SecondaryButton>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="font-montserrat text-2xl text-foreground">Skills</h1>
            <div className="flex flex-wrap gap-3 pt-3">
              {sampleUserData.skills.map((skill, index) => (
                <PrimaryButton className="w-min px-5" key={index}>
                  {skill}
                </PrimaryButton>
              ))}
              <AccentButton className="w-min px-3">
                <PlusIcon />
              </AccentButton>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex items-center justify-between gap-3">
              <h1 className="font-montserrat text-2xl text-foreground">
                Experience
              </h1>
              <AccentButton className="w-min rounded-sm px-3">
                <PlusIcon />
              </AccentButton>
            </div>
            <div className="mt-4 flex flex-col gap-5">
              {sampleUserData.experience.map((exp, index) => (
                <div key={index} className="flex gap-2">
                  <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
                    <BackpackIcon className="size-6 text-white" />
                  </span>
                  <div className="flex-1">
                    <h1 className="">
                      {exp.position} at {exp.company}
                    </h1>
                    <span className="flex items-center gap-2 text-foreground/70">
                      {exp.startDate} <WidthIcon className="text-foreground" />{" "}
                      {exp.endDate}
                    </span>
                  </div>
                  <div className="flex h-min gap-2 place-self-center">
                    <SecondaryButton className="rounded-sm">
                      <div className="flex items-center gap-1 pe-3 ps-3 md:pe-4">
                        <Pencil1Icon />
                        <span className="hidden md:block">Edit</span>
                      </div>
                    </SecondaryButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between gap-3">
              <h1 className="font-montserrat text-2xl text-foreground">
                Education
              </h1>
              <AccentButton className="w-min rounded-sm px-3">
                <PlusIcon />
              </AccentButton>
            </div>
            <div className="mt-4 flex flex-col gap-5">
              {sampleUserData.education.map((exp, index) => (
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
                      {exp.degree} from {exp.institution}
                    </h1>
                    <span className="flex items-center gap-2 text-foreground/70">
                      {exp.startDate} <WidthIcon className="text-foreground" />{" "}
                      {exp.endDate}
                    </span>
                  </div>
                  <div className="flex h-min gap-2 place-self-center">
                    <SecondaryButton className="rounded-sm">
                      <div className="flex items-center gap-1 pe-3 ps-3 md:pe-4">
                        <Pencil1Icon />
                        <span className="hidden md:block">Edit</span>
                      </div>
                    </SecondaryButton>
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
              {sampleUserData.about}
            </p>
          </div>
        </article>
      </Main>
    </Wrapper>
  );
}
