"use client";

import { useSocket } from "@/Providers/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { getMessages, sendMessages } from "@/services/chat.service";
import { formatDistanceToNow } from "date-fns";
import { Loader, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Chat({ params: { id } }: { params: { id: string } }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { socket } = useSocket();
  const divRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight - 100;
    }
  };

  const [participants, setParticipants] = useState<{
    user: string;
    recruiter: string;
    company: string;
  }>({
    user: "",
    recruiter: "",
    company: "",
  });

  const fetchMessages = useCallback(async () => {
    try {
      const response = await getMessages({
        chatId: id,
      });
      const { messages, participants } = response.data;
      setMessages(messages);
      setParticipants(participants);
      socket?.emit("joinChat", {
        id: participants.user,
      });
      scrollToBottom();
      setLoading(false);
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  }, [id, socket]);

  const messageSend = async () => {
    if (!input || !id) {
      ref?.current?.focus();
      return;
    }
    try {
      const response = await sendMessages({
        chatId: id,
        content: input,
      });
      const message = response.data;
      socket?.emit("message", { message, user: participants.recruiter });
      setMessages([...messages, message]);
      setInput("");
      ref?.current?.focus();
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    } catch (error) {
      console.log(error);
      const message = getMessage(error);
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const messageReceived = useCallback(
    (message: IMessage) => {
      setMessages([...messages, message]);
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    },

    [messages],
  );

  useEffect(() => {
    ref?.current?.focus();
  }, [ref]);

  useEffect(() => {
    socket?.on("receiveMessage", messageReceived);
  }, [socket, messageReceived]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-6 text-foreground/60">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="mt-4 flex min-h-full flex-col gap-1 lg:mt-0">
          <div className="flex h-full w-full flex-col justify-between gap-1 overflow-x-hidden px-3 pt-3">
            {!!messages.length && (
              <div
                ref={divRef}
                className="overflow0-y-auto flex max-h-[60vh] min-h-[60vh] flex-col gap-2 overflow-x-hidden scroll-smooth px-1 pb-2"
              >
                {messages?.map((message) => (
                  <div key={message?.id} className="flex">
                    <p
                      className={`${message?.sender === participants?.user ? "ms-auto rounded-l-3xl rounded-br rounded-tr-3xl bg-primaryColor text-white" : "rounded-r-3xl rounded-bl rounded-tl-3xl bg-foreground/10"} w-auto max-w-[400px] break-words break-all px-4 py-2 text-sm`}
                    >
                      <span className="">{message?.content}</span>
                      <span
                        className={`flex flex-grow justify-end text-sm text-foreground/50 ${message?.sender === participants?.user ? "text-white/70" : ""}`}
                      >
                        {formatDistanceToNow(new Date(message?.createdAt))}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
            {!messages.length && (
              <div className="flex max-h-[60vh] min-h-[60vh] flex-grow items-center justify-center text-foreground/50">
                <span>no message&apos;s</span>
              </div>
            )}
            <div className="mt-5 flex w-full gap-2">
              <Input
                ref={ref}
                placeholder="Type here..."
                className="mb-2 shadow-md shadow-foreground/20 dark:shadow-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    messageSend();
                  }
                }}
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <Button onClick={messageSend} className="h-12">
                <Send size={17} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
