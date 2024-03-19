import { Server } from "@/lib/server";
import axios from "axios";

export const LogInAction = async (FormData: {
  email: string;
  password: string;
}) => {
  const server = new Server().auth("login");
  const response = await axios.post(
    server,
    { ...FormData },
    {
      withCredentials: true,
    },
  );
  localStorage.setItem("userToken", response.data?.data?.token);
  return response;
};
