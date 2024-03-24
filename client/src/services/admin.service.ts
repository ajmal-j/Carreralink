import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

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

export {
  getVerifiedCompanies,
  getUnverifiedCompanies,
  verifyCompany,
  rejectCompany,
};
