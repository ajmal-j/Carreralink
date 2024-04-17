import { Server } from "@/lib/server";
import axios from "./axios.interseptor";
import { IResponseData } from "@/types/paginateResponse";

type InterviewData = {
  applicant: string;
  agenda: string;
  job: string;
  startDate: Date;
  time: string;
};

const createInterview = async (data: InterviewData) => {
  const url = new Server().interview("create");
  const response = await axios.post(url, data);
  return response.data;
};

interface InterviewResponse {
  data: IResponseData;
}

const getByUser = async ({
  query,
  token,
}: {
  token: string;
  query: {
    p: number | string;
  };
}): Promise<InterviewResponse> => {
  const url = new Server().interview("getByUser");
  const response = await axios.get(url, {
    params: {
      ...query,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getByRecruiter = async ({
  query,
  token,
}: {
  token: string;
  query: {
    p: number | string;
  };
}): Promise<InterviewResponse> => {
  const url = new Server().interview("getByRecruiter");
  const response = await axios.get(url, {
    params: {
      ...query,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const cancelInterview = async ({
  data,
  token,
}: {
  data: Record<string, any>;
  token: string;
}) => {
  const url = new Server().interview("cancel");
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateInterviewData = async ({
  data,
  token,
}: {
  token: string;
  data: Record<string, any>;
}) => {
  const url = new Server().interview("update");
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const joinInterview = async ({ id, token }: { id: string; token: string }) => {
  const url = new Server().interview("join");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id,
    },
  });
  return response.data;
};

const updateInterviewStatus = async ({
  data,
  token,
}: {
  data: Record<string, any>;
  token: string;
}) => {
  const url = new Server().interview("updateStatus");
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export {
  createInterview,
  updateInterviewData,
  getByUser,
  cancelInterview,
  getByRecruiter,
  joinInterview,
  updateInterviewStatus,
};
