import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

const getPlan = async ({ id, token }: { id: string; token: string }) => {
  const url = new Server().userPlan("plan");
  const response = await axios.get(url, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getPlan };
