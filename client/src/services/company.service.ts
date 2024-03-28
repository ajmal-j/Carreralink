import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

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

const getCompanyData = async () => {
  const url = new Server().company("data");
  const response = await axios.get(url, {
    withCredentials: true,
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

const updateJob = async (id: string, jobData: {}) => {
  const url = new Server().company("updateJob");
  const response = await axios.put(url, {
    id,
    jobData,
  });
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

const getSkillsAndCategories = async () => {
  const url = new Server().company("getSkillsAndCategories");
  const response = await axios.get(url);
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
  getSkillsAndCategories,
  isVerified,
  companyList,
};
