import { Server } from "@/lib/server";
import axios from "./axios.interseptor";
const createRequest = async (data: Record<string, any>) => {
  const url = new Server().recruiter("create");
  const response = await axios.post(url, data);
  return response.data;
};

const isRecruiter = async (token: string) => {
  const url = new Server().recruiter("isRecruiter");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { createRequest, isRecruiter };
