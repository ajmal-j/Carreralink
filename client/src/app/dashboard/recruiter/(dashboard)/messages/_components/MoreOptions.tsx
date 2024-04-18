"use client";

import DangerButton from "@/components/Buttons/DangerButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { deleteChats } from "@/services/chat.service";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function MoreOptions({ chat }: { chat: IRecruiterChats }) {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const deleteFunc = async () => {
    try {
      await deleteChats({
        chatId: chat.id,
      });
      toast({
        title: "Chat Deleted",
        duration: 500,
      });
      setOpen(false);
      push("/dashboard/recruiter/messages");
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
        duration: 500,
      });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="ms-auto flex size-6 items-center justify-center rounded-full border bg-foreground/10 transition-colors duration-200 ease-in-out hover:bg-foreground/30">
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          <Link
            className="block w-full cursor-pointer rounded-sm px-3 py-1 text-sm transition-colors duration-150 ease-in-out hover:bg-foreground/10"
            href={`/dashboard/recruiter/interviews/applicant/${chat.participants.user.username}`}
          >
            Applicant
          </Link>
          <Popover>
            <PopoverTrigger className="mt-2">
              <DangerButton className="w-full" size="sm">
                Delete
              </DangerButton>
            </PopoverTrigger>
            <PopoverContent>
              <h1 className="mb-2 text-sm text-foreground/70">
                Are you sure you want to delete this chat?
              </h1>
              <div className="flex items-end justify-end">
                <PopoverClose>
                  <DangerButton size="sm" onClick={deleteFunc}>
                    confirm
                  </DangerButton>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
