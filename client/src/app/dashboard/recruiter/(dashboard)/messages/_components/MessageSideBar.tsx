"use client";

import NotFound from "@/components/Custom/NotFound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMessage } from "@/lib/utils";
import { recruiterChats } from "@/services/chat.service";
import { useStateSelector } from "@/store";
import { formatDistanceToNowStrict } from "date-fns";
import { User } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import MoreOptions from "./MoreOptions";

export default function MessageSideBar() {
  const [chats, setChats] = useState<IRecruiterChats[]>([]);
  const recruiter = useStateSelector((state) => state.recruiter.recruiter);
  const fetchChats = useCallback(async () => {
    if (!recruiter?.company.id) return;
    try {
      const response = await recruiterChats({
        company: recruiter?.company.id,
      });
      const data = response.data;
      setChats(data);
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      return <NotFound title={message} />;
    }
  }, [recruiter?.company.id]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div className="flex min-w-0 flex-col gap-3 px-3 lg:min-w-[500px]">
      {chats.length === 0 && <NotFound hideBackButton title="No chat's." />}
      {chats?.map((chat) => (
        <div key={chat.id}>
          <div className="flex items-start gap-2 rounded-md bg-foreground/5 px-3 py-3 transition-colors duration-200 ease-in-out hover:bg-foreground/10">
            <Avatar className="size-11">
              <AvatarImage src={chat.participants.user?.profile} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/dashboard/recruiter/messages/${chat.id}`}
              className="flex flex-1 flex-col"
            >
              <div className="font-semibold">
                {chat.participants.user.username}
              </div>
              <div>
                {chat?.lastMessage && (
                  <div className="text-sm text-foreground/70">
                    <span className="px-1">
                      {chat.lastMessage.sender === chat.participants.recruiter
                        ? "You : "
                        : `${chat.participants.user.username} : `}
                    </span>
                    {chat.lastMessage.content.length > 15
                      ? chat.lastMessage.content.slice(0, 15).concat("...")
                      : chat.lastMessage.content}
                  </div>
                )}
              </div>
            </Link>
            <div className="flex flex-col gap-2 text-xs text-foreground/40">
              <MoreOptions chat={chat} />
              <span>
                {formatDistanceToNowStrict(chat?.updatedAt || new Date())}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
