"use client";

import { useSocket } from "@/Providers/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { getMessages, sendMessages } from "@/services/chat.service";
import { formatDistanceToNow } from "date-fns";
import { Loader } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

export default function Chat({ params: { id } }: { params: { id: string } }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const { socket } = useSocket();
  const divRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const ref = useRef<HTMLInputElement>(null);
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
        id: participants.recruiter,
      });
      scrollToBottom();
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      socket?.emit("message", { message, user: participants.user });
      setMessages([...messages, message]);
      setInput("");
      ref?.current?.focus();
      scrollToBottom();
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

  useEffect(() => {
    ref?.current?.focus();
  }, [ref]);

  const messageReceived = useCallback(
    (message: IMessage) => {
      setMessages([...messages, message]);
    },
    [messages],
  );

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
        <div className="mt-4 flex max-h-[60vh] min-h-full flex-col gap-1 lg:mt-0">
          <div className="flex max-h-[60vh] min-h-[60vh] w-full flex-col gap-1 overflow-x-auto px-1 pt-3">
            {!!messages.length &&
              messages?.map((message) => (
                <div key={message?.id} className="flex">
                  <p
                    className={`${message?.sender === participants?.recruiter ? "ms-auto rounded-l-3xl rounded-br rounded-tr-3xl bg-primaryColor text-white" : "rounded-r-3xl rounded-bl rounded-tl-3xl bg-foreground/10"} max-w-[60%] break-words px-4 py-2 text-sm`}
                  >
                    <span className="overflow-hidden">{message?.content}</span>
                    <span
                      className={`flex flex-grow justify-end text-sm text-foreground/50 ${message?.sender === participants?.recruiter ? "text-white/70" : ""}`}
                    >
                      {formatDistanceToNow(new Date(message?.createdAt))}
                    </span>
                  </p>
                </div>
              ))}
            <div className="mt-5" ref={divRef} />
            {!messages.length && (
              <div className="flex flex-grow items-center justify-center text-foreground/50">
                <span>no message&apos;s</span>
              </div>
            )}
          </div>
          <div className="mt-5 flex w-full gap-2">
            <Input
              className=""
              ref={ref}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  messageSend();
                }
              }}
              value={input}
            />
            <Button onClick={messageSend} className="h-12">
              send
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
