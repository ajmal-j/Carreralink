import { Server } from "@/lib/server";
import axios from "axios";

const LogInAction = async (FormData: { email: string; password: string }) => {
  const server = new Server().auth("adminLogin");
  const response = await axios.post(
    server,
    { ...FormData },
    {
      withCredentials: true,
    },
  );
  localStorage.setItem("adminToken", response.data?.data?.token);
  return response;
};
export { LogInAction };
