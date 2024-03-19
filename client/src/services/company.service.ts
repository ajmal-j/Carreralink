import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

const registerCompany = async (data: any) => {
  const url = new Server().auth("register");
  const response = await axios.post(url, data);
  return response.data;
};

export { registerCompany };
