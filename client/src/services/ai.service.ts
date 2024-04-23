import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

const validateResume = async ({
  resume,
  description,
  email,
}: {
  resume: string;
  description: string;
  email: string;
}) => {
  const url = new Server().ai("validateResume");
  const response = await axios.post(url, { resume, description, email });
  return response.data;
};

export { validateResume };
