import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

const createJob = async (data: any) => {
  const url = new Server().jobs("create");
  const response = await axios.post(url, data);
  return response.data;
};

const getJob = async (id: string) => {
  const url = new Server().jobs("job");
  const response = await axios.get(url, {
    params: {
      id,
    },
  });
  return response.data;
};

const getAllJobs = async (query: {
  location: string | undefined;
  type: string | undefined;
  q: string | undefined;
  p: number;
  sort: string | undefined;
}) => {
  const url = new Server().jobs("allJobs");
  const response = await axios.get(url, {
    params: {
      ...query,
    },
  });
  return response.data;
};

const allCompanyJobs = async (id: string) => {
  const url = new Server().jobs("allCompanyJobs");
  const response = await axios.get(url, {
    params: {
      id,
    },
  });
  return response.data;
};

const getAllLocations = async () => {
  const url = new Server().jobs("allLocations");
  const response = await axios.get(url);
  return response.data;
};

const createJobByRecruiter = async ({
  id,
  data,
}: {
  id: string;
  data: Record<string, any>;
}) => {
  const url = new Server().jobs("createJobByRecruiter");
  const response = await axios.post(url, {
    id,
    data,
  });
  return response.data;
};

export {
  createJob,
  getJob,
  getAllJobs,
  allCompanyJobs,
  getAllLocations,
  createJobByRecruiter,
};
