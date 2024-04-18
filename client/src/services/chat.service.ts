import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

const createChat = async ({ data }: { data: Record<string, any> }) => {
  const url = new Server().chat("create");
  const response = await axios.post(url, data);
  return response.data;
};

const recruiterChats = async ({ token }: { token?: string }) => {
  const url = new Server().chat("recruiterChats");
  const response = await axios.get(url, {
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  });
  return response.data;
};

const userChats = async ({ token }: { token?: string }) => {
  const url = new Server().chat("userChats");
  const response = await axios.get(url, {
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  });
  return response.data;
};

const getMessages = async ({ chatId }: { chatId: string }) => {
  const url = new Server().chat("message");
  const response = await axios.get(url, {
    params: { chatId },
  });
  return response.data;
};

const sendMessages = async (data: { chatId: string; content: string }) => {
  const url = new Server().chat("message");
  const response = await axios.post(url, data);
  return response.data;
};

const deleteChats = async ({ chatId }: { chatId: string }) => {
  const url = new Server().chat("deleteChats");
  const response = await axios.delete(url, {
    params: { chatId },
  });
  return response.data;
};

export {
  createChat,
  recruiterChats,
  userChats,
  getMessages,
  sendMessages,
  deleteChats,
};
