import { Server } from "@/lib/server";
import axios from "./axios.interseptor";
import { IResponseData } from "@/types/paginateResponse";

const registerCompany = async (data: any) => {
  const url = new Server().auth("register");
  const response = await axios.post(url, data);
  return response.data;
};

const allCompanies = async (query: {
  p: number;
  q?: string;
  search?: string;
}) => {
  const url = new Server().company("all");
  const response = await axios.get(url, {
    withCredentials: true,
    params: {
      ...query,
    },
  });
  return response.data;
};
const allCompaniesSSR = async () => {
  const url = new Server().company("all");
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
};

const getCompany = async (id: string) => {
  const url = new Server().company("get");
  const response = await axios.get(url, {
    withCredentials: true,
    params: {
      id,
    },
  });
  return response.data;
};

const getCompanyData = async (token?: string) => {
  const url = new Server().company("data");
  const response = await axios.get(url, {
    ...(token && { headers: { companyToken: `Bearer ${token}` } }),
  });
  return response.data;
};

const updateCompany = async (data: any) => {
  const url = new Server().company("update");
  const response = await axios.put(url, data, {
    withCredentials: true,
  });
  return response.data;
};

const updateCoverPhoto = async (data: any) => {
  const url = new Server().company("updateCoverPhoto");
  const response = await axios.put(url, data);
  return response.data;
};

const getAllJobsByCompanySSR = async (token: string) => {
  const url = new Server().company("allJobs");
  const response = await axios.get(url, {
    withCredentials: true,
    headers: {
      CompanyToken: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateJob = async (
  id: string,
  jobData: Record<string, any>,
  token?: string,
) => {
  const url = new Server().company("updateJob");
  const response = await axios.put(
    url,
    {
      id,
      jobData,
    },
    {
      headers: {
        CompanyToken: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

const isVerified = async (token: string) => {
  const url = new Server().company("isVerified");
  const response = await axios.get(url, {
    headers: {
      CompanyToken: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getJobs = async (
  token: string,
  options: {
    location: string | undefined;
    type: string | undefined;
    q: string | undefined;
    p: number;
    sort: string | undefined;
    status: string | undefined;
  },
) => {
  const url = new Server().company("jobs");
  const response = await axios.get(url, {
    params: {
      ...options,
    },
    headers: {
      CompanyToken: `Bearer ${token}`,
    },
  });
  return response.data;
};

const companyList = async (q: string) => {
  const url = new Server().company("companyList");
  const response = await axios.get(url, {
    params: {
      q,
    },
  });
  return response.data;
};

const getRecruiters = async () => {
  const url = new Server().company("getRecruiter");
  const response = await axios.get(url);
  return response.data;
};

const getPendingRequests = async () => {
  const url = new Server().company("getPendingRequests");
  const response = await axios.get(url);
  return response.data;
};

const assignRecruiter = async ({ id }: { id: string }) => {
  const url = new Server().company("assignRecruiter");
  const response = await axios.put(url, {
    id,
  });
  return response.data;
};
const rejectRequest = async ({ id }: { id: string }) => {
  const url = new Server().company("rejectRequest");
  const response = await axios.put(url, {
    id,
  });
  return response.data;
};

const removeRecruiter = async ({ id }: { id: string }) => {
  const url = new Server().company("removeRecruiter");
  const response = await axios.delete(url, {
    data: {
      id,
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
  const url = new Server().company("totalCounts");
  const response = await axios.get(url, {
    headers: {
      companyToken: `Bearer ${token}`,
    },
  });
  return response.data;
};

const graphData = async ({ filter }: { filter: "yearly" | "monthly" }) => {
  const url = new Server().company("graphData");
  const response = await axios.get(url, {
    params: {
      filter,
    },
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
  const url = new Server().company("updateJobStatus");
  const response = await axios.patch(url, {
    job,
    status,
  });
  return response.data;
};

const assignRecruiterToJob = async ({
  job,
  recruiter,
}: {
  recruiter: string;
  job: string;
}) => {
  const url = new Server().jobs("assignRecruiter");
  const response = await axios.patch(url, {
    job,
    recruiter,
  });
  return response.data;
};

export {
  registerCompany,
  allCompanies,
  getCompany,
  getCompanyData,
  getAllJobsByCompanySSR,
  updateCompany,
  allCompaniesSSR,
  updateJob,
  getJobs,
  isVerified,
  companyList,
  updateCoverPhoto,
  getRecruiters,
  getPendingRequests,
  assignRecruiter,
  rejectRequest,
  removeRecruiter,
  totalCounts,
  graphData,
  updateJobStatus,
  assignRecruiterToJob,
};
