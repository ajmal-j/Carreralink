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

const saveJob = async (job: string) => {
  const url = new Server().jobs("saveJob");
  const response = await axios.post(url, {
    job,
  });
  return response.data;
};

const getSavedJobs = async () => {
  const url = new Server().jobs("getSavedJobs");
  const response = await axios.get(url);
  return response.data;
};

const removeSavedJob = async (job: string) => {
  const url = new Server().jobs("removeSavedJob");
  const response = await axios.delete(url, {
    params: {
      job,
    },
  });
  return response.data;
};

const isSaved = async (job: string) => {
  const url = new Server().jobs("isSaved");
  const response = await axios.get(url, {
    params: {
      job,
    },
  });
  return response.data;
};
const isApplied = async (job: string) => {
  const url = new Server().jobs("isApplied");
  const response = await axios.get(url, {
    params: {
      job,
    },
  });
  return response.data;
};

const apply = async ({ job, resume }: { job: string; resume: string }) => {
  const url = new Server().jobs("apply");
  const response = await axios.post(url, {
    job,
    resume,
  });
  return response.data;
};

const withdraw = async ({ job }: { job: string }) => {
  const url = new Server().jobs("withdraw");
  const response = await axios.delete(url, {
    params: {
      job,
    },
  });
  return response.data;
};

const getAppliedJobs = async () => {
  const url = new Server().jobs("getAppliedJobs");
  const response = await axios.get(url);
  return response.data;
};

export {
  allCompanyJobs,
  createJob,
  createJobByRecruiter,
  getAllJobs,
  getAllLocations,
  getJob,
  getSavedJobs,
  removeSavedJob,
  saveJob,
  isSaved,
  apply,
  withdraw,
  getAppliedJobs,
  isApplied,
};
