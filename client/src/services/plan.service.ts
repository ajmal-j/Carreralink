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

const userOrders = async ({ token }: { token: string }) => {
  const url = new Server().order("userOrders");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const companyOrders = async ({ token }: { token: string }) => {
  const url = new Server().order("companyOrders");
  const response = await axios.get(url, {
    headers: {
      companyToken: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getPlan, userOrders, companyOrders };
