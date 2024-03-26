import { Server } from "@/lib/server";
import { FormData } from "./page";
import axios from "axios";

interface IFormData extends Omit<Omit<FormData, "confirmPassword">, "contact"> {
  contact: number;
}

export const SignUp = async (FormData: IFormData) => {
  const server = new Server().auth("signup");
  const response = await axios.post(server, { ...FormData });
  return response.data;
};
