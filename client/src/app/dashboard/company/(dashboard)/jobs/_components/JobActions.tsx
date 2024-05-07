"use client";

import AccentButton from "@/components/Buttons/AccentButton";
import DangerButton from "@/components/Buttons/DangerButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import MangeJobAssessment from "@/components/Custom/MangeJobAssessments";
import EditJobDialogue from "@/components/FormsAndDialog/EditJob";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn, getMessage } from "@/lib/utils";
import {
  assignRecruiterToJob,
  getRecruiters,
  updateJobStatus,
} from "@/services/company.service";
import { useStateSelector } from "@/store";
import { IRecruiter } from "@/store/reducers/recruiter.slice";
import { IJob } from "@/types/jobs";
import { AvatarIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { CommandList } from "cmdk";
import { Check, ChevronsUpDown, UserRoundCog } from "lucide-react";
import { markdownToDraft } from "markdown-draft-js";
import { useEffect, useState } from "react";

export default function JobActions({
  job,
  id,
  revalidatePage,
}: {
  job: IJob;
  id: string;
  revalidatePage: () => Promise<void>;
}) {
  const companyData = useStateSelector((state) => state.company);
  const [status, setStatus] = useState(job.status);
  const [open, setOpen] = useState(false);

  const updateStatus = async ({ status }: { status: "open" | "closed" }) => {
    try {
      await updateJobStatus({
        job: id,
        status,
      });
      setStatus(status);
      toast({
        title: `Job ${status === "open" ? "Opened" : "Closed"} successfully.`,
      });
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-2 sm:flex-row">
        <EditJobDialogue
          defaultValues={{
            title: job.title,
            type: job.type,
            category: job.category,
            openings: job.openings,
            workSpace: job.workSpace,
            officeLocation: job.officeLocation,
            skills: job.skills,
            pay: job.pay,
            description: markdownToDraft(job.description),
          }}
          id={id}
        />
        {status === "open" ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="h-min">
              <DangerButton size="sm">close</DangerButton>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 text-sm" align="end">
              <h1>Are you sure you want to close this job?</h1>
              <div>
                <DangerButton
                  onClick={() => updateStatus({ status: "closed" })}
                  className="ms-auto w-min"
                  size="sm"
                >
                  confirm
                </DangerButton>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="h-min">
              <AccentButton size="sm">open</AccentButton>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 text-sm" align="end">
              <h1>Are you sure you want to re open this job?</h1>
              <div className="flex justify-end">
                <AccentButton
                  onClick={() => updateStatus({ status: "open" })}
                  className="w-min"
                  size="sm"
                >
                  confirm
                </AccentButton>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      {job?.postedBy?.by === "company" && (
        <AssignRecruiterDialogue {...{ job, id, revalidatePage }} />
      )}
      {companyData?.plan?.features?.jobAssessments && (
        <MangeJobAssessment job={job} />
      )}
    </div>
  );
}

function AssignRecruiterDialogue({
  job,
  id,
  revalidatePage,
}: {
  job: IJob;
  id: string;
  revalidatePage: () => Promise<void>;
}) {
  const [recruiters, setRecruiters] = useState<IRecruiter[]>(
    [] as IRecruiter[],
  );
  const [open, setOpen] = useState(false);
  const [openCommand, setOpenCommand] = useState(false);
  const [value, setValue] = useState<string>(job?.managedBy?.id || "");

  const assignRecruiter = async () => {
    if (!value || value === job?.managedBy?.id) return;
    try {
      await assignRecruiterToJob({
        job: id,
        recruiter: value,
      });
      toast({
        title: "Recruiter assigned successfully",
      });
      setOpenCommand(() => false);
      setOpen(() => false);
      revalidatePage();
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await getRecruiters();
      const { docs, ...rest } = await response?.data;
      setRecruiters(docs);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PrimaryButton className="" size="sm">
          <div className="flex items-center gap-1">
            <UserRoundCog size={16} />
            <span className="hidden sm:block">assign job</span>
          </div>
        </PrimaryButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign job</DialogTitle>
          {job.managedBy ? (
            <div className="flex flex-col gap-2 p-2">
              <h1 className="text-sm text-foreground/80">
                Currently managed by:
              </h1>
              <div className="flex gap-2">
                <Avatar className="size-10 cursor-pointer border md:size-10">
                  <AvatarImage
                    src={job?.managedBy?.profile}
                    alt="logo"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <AvatarIcon className="size-6 text-foreground/50" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span>{job?.managedBy.username}</span>
                  <span className="text-sm text-foreground/70">
                    {job?.managedBy.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <h3>Not assigned yet</h3>
            </div>
          )}
        </DialogHeader>
        <Popover open={openCommand} onOpenChange={setOpenCommand}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCommand}
              className="w-full justify-between"
            >
              {value
                ? recruiters.find((rec) => rec.user._id === value)?.user
                    .username
                : "Select Recruiter..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search recruiters..." />
              <CommandEmpty>No recruiters found.</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {recruiters.map((recruiter) => (
                    <CommandItem
                      key={recruiter.user._id}
                      value={recruiter.user.username}
                      onSelect={(select) => {
                        const currentValue = recruiters.find(
                          (rec) => rec.user.username === select,
                        )?.user._id as string;
                        setValue(currentValue === value ? "" : currentValue);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === recruiter.user._id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      <div className="flex gap-2">
                        <Avatar className="size-10 cursor-pointer border md:size-10">
                          <AvatarImage
                            src={recruiter?.user?.profile}
                            alt="logo"
                            className="object-cover"
                          />
                          <AvatarFallback>
                            <AvatarIcon className="size-6 text-foreground/50" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <span>{recruiter.user.username}</span>
                          <span className="text-sm text-foreground/70">
                            {recruiter.user.email}
                          </span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="flex justify-end">
          <Popover>
            <PopoverTrigger
              className="h-min"
              disabled={!value || value === job?.managedBy?.id}
            >
              <Button
                size={"sm"}
                variant={"outline"}
                disabled={!value || value === job?.managedBy?.id}
              >
                <span className="text-sm">Assign</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 text-sm" align="end">
              <h1>
                Are you sure you want to assign this job to{" "}
                {
                  recruiters.find((rec) => rec.user._id === value)?.user
                    .username
                }
                ?
              </h1>
              <div>
                <PopoverClose>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={assignRecruiter}
                    disabled={!value || value === job?.managedBy?.id}
                  >
                    <span className="text-sm">Assign</span>
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </DialogContent>
    </Dialog>
  );
}
