/* eslint-disable @next/next/no-img-element */
"use client";

import {
  BackpackIcon,
  ExternalLinkIcon,
  EyeOpenIcon,
  FileIcon,
  LinkBreak2Icon,
  PersonIcon,
  Share2Icon,
  TrashIcon,
  UploadIcon,
  WidthIcon,
} from "@radix-ui/react-icons";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Link from "next/link";
import { EditProfile } from "@/components/FormsAndDialog/EditDialog";
import { EditEducation } from "@/components/FormsAndDialog/EditEducation";
import { EditExperience } from "@/components/FormsAndDialog/EditExperience";
import { EditSkill } from "@/components/FormsAndDialog/EditSkill";
import { useDispatch } from "react-redux";
import { useStateSelector } from "@/store";
import { Dispatch, FormEvent, ReactNode, useEffect, useState } from "react";
import {
  addResume,
  currentUser,
  deleteEducation,
  deleteExperience,
  removeResume,
  updateProfilePic,
} from "@/services/user.service";
import {
  IUser,
  deleteEducationState,
  deleteExperienceState,
  setUser,
  updateProfilePicState,
  updateResumeState,
} from "@/store/reducers/user.slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import NotFound from "@/components/Custom/NotFound";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { PDFviewer } from "@/components/Custom/PDFviewer";

export default function Profile() {
  const { isAuth, user } = useStateSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [openResume, setOpenResume] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const data = await currentUser();
        dispatch(setUser(data?.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const updateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      // @ts-expect-error
      if (!formData.get("profile")?.name)
        throw new Error("Please select an image");
      const response = await updateProfilePic(formData);
      const url = await response?.data;
      dispatch(updateProfilePicState(url as string));
      toast({
        title: "Profile updated successfully",
      });
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      } else {
        const message = getMessage(error);
        toast({
          title: message,
          variant: "destructive",
        });
      }
    }
  };

  const addResumeHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      // @ts-expect-error
      if (!formData.get("resume")?.name)
        throw new Error("Please select a resume.");
      if (!formData.get("name")) throw new Error(`Please enter resume title.`);
      const response = await addResume(formData);
      const resume = await response?.data;
      dispatch(updateResumeState(resume as Pick<IUser, "resume">));
      toast({
        title: "Resume updated successfully",
      });
      setOpenResume(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      } else {
        const message = getMessage(error);
        toast({
          title: message,
          variant: "destructive",
        });
      }
    }
  };
  if (!isAuth || !user) return <NotFound title="User not found" />;
  return (
    isAuth &&
    user && (
      <article className="md:px-4">
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
              <UpdateProfile
                open={open}
                setOpen={setOpen}
                updateProfile={updateProfile}
              />
            </div>
            <div className="mt-auto w-full pb-2 ps-2 text-foreground/70">
              <h1 className="font-montserrat text-2xl capitalize text-foreground">
                {user.username}
              </h1>
              <p className="capitalize">{user.currentStatus}</p>
              <p className="capitalize">{user.workingAt}</p>
              <p className="capitalize">{user.place}</p>
              <p>
                <span className="font-semibold text-foreground">Contact :</span>{" "}
                {user.email} , {user.contact}
              </p>
            </div>
          </div>
          <div className="ms-auto mt-auto pb-2">
            <EditProfile
              defaultValues={{
                username: user.username,
                contact: String(user.contact),
                place: user.place,
                currentStatus: user.currentStatus,
                workingAt: user.workingAt,
                portfolioLink: user.portfolioLink,
                about: user.about,
              }}
            />
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-5">
          <div className="flex gap-2">
            <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
              <FileIcon className="size-6 text-white" />
            </span>
            <div className="flex-1">
              <h1>Resume</h1>
              <span className="text-foreground/70">
                {user?.resume?.resumes?.length ? (
                  <Link
                    href={
                      user?.resume?.resumes[user?.resume?.primary ?? 0]?.url
                    }
                  >
                    <span className="underline">view resume</span>
                  </Link>
                ) : (
                  "No resume"
                )}
                {/* <PDFviewer
                  resume={user?.resume?.resumes[user?.resume?.primary ?? 0].url}
                >
                  <EyeOpenIcon />
                </PDFviewer> */}
              </span>
            </div>
            <div className="flex h-min gap-2 place-self-center">
              <ViewResumes resume={user?.resume}>
                <PrimaryButton className="rounded-sm">
                  <div className="flex items-center gap-1 pe-3 ps-3 ">
                    <EyeOpenIcon />
                    <span className="hidden md:block">view</span>
                  </div>
                </PrimaryButton>
              </ViewResumes>
              <AddResume
                open={openResume}
                setOpen={setOpenResume}
                updateResume={addResumeHandler}
              >
                <SecondaryButton className="rounded-sm">
                  <div className="flex items-center gap-1 pe-3 ps-3 ">
                    <Share2Icon />
                  </div>
                </SecondaryButton>
              </AddResume>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="me-2 h-min place-self-center rounded-sm bg-primaryColor p-3">
              <LinkBreak2Icon className="size-6 text-white" />
            </span>
            <div className="flex-1">
              <h1>Portfolio</h1>
              <span className="text-foreground/70 underline">
                {user?.portfolioLink ? (
                  <Link target="_blank" href={user?.portfolioLink as string}>
                    {user?.portfolioLink?.length > 16
                      ? (user.portfolioLink as string)
                          .substring(0, 16)
                          .concat("...")
                      : user.portfolioLink}
                  </Link>
                ) : (
                  "add your portfolio link"
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="pb-2 font-montserrat text-2xl text-foreground">
            Skills
          </h1>
          <div className="flex flex-wrap gap-3 pt-3">
            {user.skills.map((skill: string, index: number) => (
              <PrimaryButton className="w-min text-nowrap px-5" key={index}>
                {skill}
              </PrimaryButton>
            ))}
            {!user.skills.length && (
              <h1 className="text-center text-foreground/70">
                Add your skills here.
              </h1>
            )}
            <EditSkill defaultValues={user.skills} />
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between gap-3 pb-5">
            <h1 className="font-montserrat text-2xl text-foreground">
              Experience
            </h1>
            <EditExperience
              defaultValues={{
                companyName: "",
                position: "",
                startDate: "",
                endDate: "",
              }}
            />
          </div>
          <div className="mt-4 flex flex-col gap-5">
            {!user.experience.length && (
              <h1 className="text-foreground/70">Add your experience here.</h1>
            )}
            {user.experience.map((exp, index) => (
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
                <div className="flex h-min items-center gap-2 place-self-center">
                  <EditExperience
                    id={exp._id}
                    defaultValues={{
                      companyName: exp.companyName,
                      position: exp.position,
                      startDate: exp.startDate,
                      endDate: exp.endDate,
                    }}
                  />
                  <TrashIcon
                    onClick={async () => {
                      await deleteExperience(exp?._id);
                      dispatch(deleteExperienceState(exp._id));
                    }}
                    className="size-4 cursor-pointer text-red-600"
                  />
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
            />
          </div>
          <div className="mt-4 flex flex-col gap-5">
            {!user.education.length && (
              <h1 className="text-foreground/70">Add your education here.</h1>
            )}
            {user.education.map((edu, index) => (
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
                <div className="flex h-min items-center gap-2  place-self-center">
                  <EditEducation
                    id={edu?._id}
                    defaultValues={{
                      institution: edu.institution,
                      degree: edu.degree,
                      startDate: edu.startDate,
                      endDate: edu.endDate,
                    }}
                  />
                  <TrashIcon
                    onClick={async () => {
                      await deleteEducation(edu?._id);
                      dispatch(deleteEducationState(edu._id));
                    }}
                    className="size-4 cursor-pointer text-red-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {user.about && (
            <>
              <h1 className="text-center font-montserrat text-2xl text-foreground">
                About
              </h1>
              <p className="mx-auto max-w-[850px] text-foreground/80 before:ms-11 before:content-['“'] after:content-['”']">
                {user.about}
              </p>
            </>
          )}
        </div>
      </article>
    )
  );
}

const UpdateProfile = ({
  open,
  setOpen,
  updateProfile,
}: {
  open: boolean;
  setOpen: any;
  updateProfile: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  const [image, setImage] = useState<Blob | undefined>();
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setImage(undefined);
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>
        <div className="absolute bottom-[-3px] right-0 cursor-pointer rounded-full border border-foreground/20 bg-background p-1 opacity-60 transition-all duration-200 hover:opacity-100">
          <UploadIcon className="size-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-3 text-xl text-foreground/70">
            Update profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={updateProfile}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="profile" className="pb-2 ps-1">
              Image
            </Label>
            <Input
              type="file"
              className="pt-3"
              id="profile"
              name="profile"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            {image && (
              <img
                src={image ? URL.createObjectURL(image) : ""}
                className="mx-auto mb-1 mt-3 w-[200px] rounded-xl object-cover"
              />
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" variant="outline">
              <UploadIcon />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AddResume = ({
  open,
  setOpen,
  updateResume,
  children,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  updateResume: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-3 text-xl text-foreground/70">
            Update Resume
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={updateResume}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" className="pb-2 ps-1">
              Title
            </Label>
            <Input
              type="text"
              className="pt-3"
              id="name"
              name="name"
              placeholder="Name"
            />
            <Label htmlFor="resume" className="pb-2 ps-1 pt-3">
              Resume (pdf)
            </Label>
            <Input
              type="file"
              className="pt-3"
              id="resume"
              name="resume"
              accept=".pdf"
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" variant="outline">
              <UploadIcon />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
const ViewResumes = ({
  children,
  resume,
}: {
  children: ReactNode;
  resume: IUser["resume"];
}) => {
  const dispatch = useDispatch();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-3 text-xl text-foreground/70">
            Resume&apos;s ({resume?.resumes?.length})
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {!resume?.resumes.length && (
            <h4 className="text-center text-foreground/60">No resume found.</h4>
          )}
          {resume?.resumes.map((res, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition-all duration-200 hover:bg-foreground/10"
            >
              <span>
                <span className="capitalize">{res.name}</span>
                {resume.primary === index && (
                  <span className="ps-3 text-foreground/70">(primary)</span>
                )}
              </span>
              <div className="flex gap-2">
                <Link href={res.url} target="_blank">
                  <ExternalLinkIcon className="size-4 cursor-pointer hover:text-blue-600" />
                </Link>
                <Popover>
                  <PopoverTrigger asChild>
                    <TrashIcon className="size-4 cursor-pointer text-red-600" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="flex flex-col gap-2">
                    <Label>Are you sure you want to remove this resume?</Label>
                    <PopoverClose className="ms-auto space-x-1">
                      <Button
                        onClick={async () => {
                          const response = await removeResume(res.url);
                          dispatch(updateResumeState(response.data));
                        }}
                        size={"sm"}
                        className="bg-red-500/20 text-red-500 hover:bg-red-500/50 hover:text-white"
                      >
                        remove
                      </Button>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
