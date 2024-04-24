import { Server } from "@/lib/server";
import axios from "./axios.interseptor";
import { IResponseData } from "@/types/paginateResponse";

const currentAdmin = async () => {
  const url = new Server().adminUser("currentAdmin");
  const response = await axios.get(url);
  return response.data;
};

const getVerifiedCompanies = async ({
  token,
  query,
}: {
  token: string;
  query: {
    p?: number | string;
  };
}) => {
  const url = new Server().adminCompany("verifiedCompanies");
  const response = await axios.get(url, {
    headers: {
      adminToken: `Bearer ${token}`,
    },
    params: {
      ...query,
    },
  });
  return response.data;
};
const getUnverifiedCompanies = async ({
  token,
  query,
}: {
  token: string;
  query: {
    p?: number | string;
  };
}) => {
  const url = new Server().adminCompany("unverifiedCompanies");
  const response = await axios.get(url, {
    headers: {
      adminToken: `Bearer ${token}`,
    },
    params: {
      ...query,
    },
  });
  return response.data;
};

const deleteUsers = async ({ users }: { users: string[] }) => {
  const url = new Server().adminUser("deleteUsers");
  const response = await axios.delete(url, {
    data: {
      users,
    },
  });
  return response.data;
};

const verifyCompany = async ({ token, id }: { token: string; id: string }) => {
  const url = new Server().adminCompany("verifyCompany");
  const response = await axios.post(
    url,
    {},
    {
      headers: {
        adminToken: `Bearer ${token}`,
      },
      params: {
        id,
      },
    },
  );
  return response.data;
};
const rejectCompany = async ({ token, id }: { token: string; id: string }) => {
  const url = new Server().adminCompany("rejectCompany");
  const response = await axios.delete(url, {
    headers: {
      adminToken: `Bearer ${token}`,
    },
    params: {
      id,
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
  };
}) => {
  const url = new Server().adminCompany("jobs");
  const response = await axios.get(url, {
    headers: {
      adminToken: `Bearer ${token}`,
    },
    params: {
      ...query,
    },
  });
  return response.data;
};

const addCategories = async ({ categories }: { categories: string[] }) => {
  const url = new Server().admin("addCategories");
  const response = await axios.post(url, {
    categories,
  });
  return response.data;
};
const addSkills = async ({ skills }: { skills: string[] }) => {
  const url = new Server().admin("addSkills");
  const response = await axios.post(url, {
    skills,
  });
  return response.data;
};

const removeCategory = async ({ category }: { category: string }) => {
  const url = new Server().admin("removeCategory");
  const response = await axios.delete(url, {
    data: {
      category,
    },
  });
  return response.data;
};
const removeSkill = async ({ skill }: { skill: string }) => {
  const url = new Server().admin("removeSkill");
  const response = await axios.delete(url, {
    data: {
      skill,
    },
  });
  return response.data;
};

const getUsers = async ({
  token,
  query,
}: {
  token: string;
  query: { p?: number | string; q?: string };
}) => {
  const url = new Server().adminUser("users");
  const response = await axios.get(url, {
    params: {
      ...query,
    },
    headers: {
      adminToken: `Bearer ${token}`,
    },
  });
  return response.data;
};

const toggleBlock = async ({ email }: { email: string }) => {
  const url = new Server().adminUser("toggleBlock");
  const response = await axios.patch(url, {
    email,
  });
  return response.data;
};

const deleteJobs = async ({ jobs }: { jobs: string[] }) => {
  const url = new Server().adminCompany("deleteJobs");
  const response = await axios.delete(url, {
    data: {
      jobs,
    },
  });
  return response.data;
};

const editJob = async ({
  id,
  values,
  token,
}: {
  id: string;
  values: Record<string, any>;
  token: string;
}) => {
  const url = new Server().adminCompany("editJob");
  const response = await axios.post(
    url,
    {
      id,
      values,
    },
    {
      headers: {
        adminToken: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
const editCompany = async ({
  data,
  token,
}: {
  data: FormData;
  token: string;
}) => {
  const url = new Server().adminCompany("editCompany");
  const response = await axios.post(url, data, {
    headers: {
      adminToken: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
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
  const url = new Server().adminCompany("totalCounts");
  const response = await axios.get(url, {
    headers: {
      adminToken: `Bearer ${token}`,
    },
  });
  return response.data;
};

const graphData = async ({ filter }: { filter: "yearly" | "monthly" }) => {
  const url = new Server().adminCompany("graphData");
  const response = await axios.get(url, {
    params: {
      filter,
    },
  });
  return response.data;
};

const getSkillsAndCategories = async () => {
  const url = new Server().admin("getSkillsAndCategories");
  const response = await axios.get(url);
  return response.data;
};

export {
  getVerifiedCompanies,
  getUnverifiedCompanies,
  verifyCompany,
  rejectCompany,
  addCategories,
  addSkills,
  removeCategory,
  removeSkill,
  currentAdmin,
  getUsers,
  toggleBlock,
  deleteUsers,
  getJobs,
  editJob,
  deleteJobs,
  editCompany,
  totalCounts,
  getSkillsAndCategories,
  graphData,
};
