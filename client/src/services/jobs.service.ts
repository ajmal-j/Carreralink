import { Server, ServerSSR } from "@/lib/server";
import axios from "./axios.interseptor";

const createJob = async (data: any) => {
  const url = new Server().jobs("create");
  const response = await axios.post(url, data);
  return response.data;
};

const getJob = async (id: string) => {
  const url = new ServerSSR().jobs("job");
  const response = await axios.get(url, {
    params: {
      id,
    },
  });
  return response.data;
};

const getAllJobs = async (options: {
  location: string | undefined;
  type: string | undefined;
  q: string | undefined;
  p: number;
}) => {
  const url = new ServerSSR().jobs("allJobs");
  const response = await axios.get(url, {
    params: {
      ...options,
    },
  });
  return response.data;
};

const allCompanyJobs = async (id: string) => {
  const url = new ServerSSR().jobs("allCompanyJobs");
  const response = await axios.get(url, {
    params: {
      id,
    },
  });
  return response.data;
};

export { createJob, getJob, getAllJobs, allCompanyJobs };
