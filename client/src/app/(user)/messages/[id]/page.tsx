"use client";

import { useSocket } from "@/Providers/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getMessage } from "@/lib/utils";
import { getMessages, sendMessages } from "@/services/chat.service";
import { useCallback, useEffect, useState } from "react";

export default function Chat({ params: { id } }: { params: { id: string } }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const { socket } = useSocket();
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
    } catch (error) {
      console.log(error);
    }
  }, [id, socket]);

  const messageSend = async () => {
    if (!input || !id) return;
    try {
      const response = await sendMessages({
        chatId: id,
        content: input,
      });
      const message = response.data;
      socket?.emit("message", { message, user: participants.recruiter });
      setMessages([...messages, message]);
      setInput("");
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
    },
    [messages],
  );

  useEffect(() => {
    socket?.on("receiveMessage", messageReceived);
  }, [socket, messageReceived]);

  return (
    <div className="flex flex-col gap-1">
      {!!messages.length &&
        messages?.map((message) => (
          <div key={message?.id} className="flex w-full">
            <p
              className={`${message?.sender === participants?.user ? "ms-auto bg-primaryColor" : "bg-foreground/10"}  rounded-full px-3 py-2`}
            >
              <span>{message?.content}</span>
            </p>
          </div>
        ))}
      <div className="mt-5 flex w-full gap-2">
        <Input onChange={(e) => setInput(e.target.value)} value={input} />
        <Button onClick={messageSend} className="h-12">
          send
        </Button>
      </div>
    </div>
  );
}
