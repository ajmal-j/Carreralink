import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

const validateResume = async ({
  resume,
  description,
}: {
  resume: string;
  description: string;
}) => {
  const url = new Server().ai("validateResume");
  const response = await axios.post(url, { resume, description });
  return response.data;
};

export { validateResume };
