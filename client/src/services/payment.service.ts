import { Server } from "@/lib/server";
import axios from "./axios.interseptor";

const createPaymentSession = async ({
  product,
  email,
}: {
  product: IPlan;
  email: string;
}) => {
  const url = new Server().payment("createSession");
  const response = await axios.post(url, { product, email });
  return response.data;
};

const confirmPaymentByUser = async ({
  id,
  token,
  item,
}: {
  id: string;
  token: string;
  item: Record<string, any>;
}) => {
  const url = new Server().payment("confirmByUser");
  const response = await axios.post(
    url,
    { id, item },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
const confirmPaymentByCompany = async ({
  id,
  token,
  item,
}: {
  id: string;
  token: string;
  item: Record<string, any>;
}) => {
  const url = new Server().payment("confirmByCompany");
  const response = await axios.post(
    url,
    { id, item },
    {
      headers: {
        companyToken: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export { createPaymentSession, confirmPaymentByCompany, confirmPaymentByUser };
