import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

type InterviewData = {
  applicant: string;
  agenda: string;
  job: string;
  startDate: Date;
  time: string;
};

const createInterview = async (data: InterviewData) => {
  const url = new Server().interview("create");
  const response = await axios.post(url, data);
  return response.data;
};

export { createInterview };
