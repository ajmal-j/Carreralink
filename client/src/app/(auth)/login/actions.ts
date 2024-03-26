import { Server } from "@/lib/server";
import axios, { AxiosError, AxiosResponse } from "axios";

export const LogInAction = async (FormData: {
  email: string;
  password: string;
}): Promise<AxiosResponse<any> | number | unknown> => {
  try {
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
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.status === 403) {
      return error.response?.status;
    }
    console.log(error);
    return error;
  }
};
