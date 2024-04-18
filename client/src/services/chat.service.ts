import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

const createChat = async ({
  data,
  token,
}: {
  token: string;
  data: Record<string, any>;
}) => {
  const url = new Server().chat("create");
  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { createChat };
