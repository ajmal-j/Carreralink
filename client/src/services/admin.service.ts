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
  const url = new Server().company("verifiedCompanies");
  const response = await axios.get(url, {
    withCredentials: true,
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
  const url = new Server().company("unverifiedCompanies");
  const response = await axios.get(url, {
    withCredentials: true,
    headers: {
      adminToken: `Bearer ${token}`,
    },
    params: {
      ...query,
    },
  });
  return response.data;
};

export { getVerifiedCompanies, getUnverifiedCompanies };
