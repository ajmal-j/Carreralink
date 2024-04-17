import { Server } from "@/lib/server";
import axios from "./axios.interseptor";
import { IResponseData } from "@/types/paginateResponse";
const createRequest = async (data: Record<string, any>) => {
  const url = new Server().recruiter("create");
  const response = await axios.post(url, data);
  return response.data;
};

const isRecruiter = async (token: string) => {
  const url = new Server().recruiter("isRecruiter");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getJobs = async ({
  token,
  query,
}: {
  token: string;
  query: {
    p?: number | string;
    q?: string;
    applicants?: string;
  };
}) => {
  const url = new Server().recruiter("getJobs");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...query,
    },
  });
  return response.data;
};

interface IDashboardData {
  data: {
    counts: {
      totalJobs: number;
      openJobs: number;
      totalApplied: number;
    };
    recentJobs: IResponseData;
  };
}

const totalCounts = async ({
  token,
}: {
  token: string;
}): Promise<IDashboardData> => {
  const url = new Server().recruiter("totalCounts");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const graphData = async ({ filter }: { filter: "yearly" | "monthly" }) => {
  const url = new Server().recruiter("graphData");
  const response = await axios.get(url, {
    params: {
      filter,
    },
  });
  return response.data;
};

const updateApplicantStatus = async ({
  job,
  user,
  status,
}: {
  job: string;
  user: string;
  status: string;
}) => {
  const url = new Server().recruiter("updateApplicantStatus");
  const response = await axios.patch(url, {
    job,
    user,
    status,
  });
  return response.data;
};

const updateJobStatus = async ({
  job,
  status,
}: {
  job: string;
  status: string;
}) => {
  const url = new Server().recruiter("updateJobStatus");
  const response = await axios.patch(url, {
    job,
    status,
  });
  return response.data;
};

export {
  createRequest,
  isRecruiter,
  getJobs,
  totalCounts,
  graphData,
  updateApplicantStatus,
  updateJobStatus,
};
