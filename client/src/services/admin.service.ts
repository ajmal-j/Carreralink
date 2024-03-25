import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

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

const addCategories = async ({ categories }: { categories: string[] }) => {
  const url = new Server().adminCompany("addCategories");
  const response = await axios.post(url, {
    categories,
  });
  return response.data;
};
const addSkills = async ({ skills }: { skills: string[] }) => {
  const url = new Server().adminCompany("addSkills");
  const response = await axios.post(url, {
    skills,
  });
  return response.data;
};

const removeCategory = async ({ category }: { category: string }) => {
  const url = new Server().adminCompany("removeCategory");
  const response = await axios.delete(url, {
    data: {
      category,
    },
  });
  return response.data;
};
const removeSkill = async ({ skill }: { skill: string }) => {
  const url = new Server().adminCompany("removeSkill");
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
  query: { p?: number | string };
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
};
