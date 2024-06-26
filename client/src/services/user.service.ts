import { AxiosError } from "axios";
import { Server } from "../lib/server";
import axios from "./axios.interseptor";

const currentUser = async (token?: string) => {
  try {
    const url = new Server().user("currentUser");
    const response = await axios.get(url, {
      ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
    });
    if (response.status === 401) return 401;
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) return 401;
    } else {
      console.log(error);
      return error;
    }
  }
};

const verifyUser = async ({ email, otp }: { email: string; otp: string }) => {
  const url = new Server().auth("verifyUser");
  const response = await axios.post(url, { email, otp });
  return response.data;
};

const updateProfile = async (data: any) => {
  const url = new Server().user("updateProfile");
  const response = await axios.patch(url, data);
  return response.data;
};
const updateEducation = async (data: any) => {
  const url = new Server().user("updateEducation");
  const response = await axios.patch(url, data);
  return response.data;
};
const addEducation = async (data: any) => {
  const url = new Server().user("addEducation");
  const response = await axios.post(url, data);
  return response.data;
};
const addExperience = async (data: any) => {
  const url = new Server().user("addExperience");
  const response = await axios.post(url, data);
  return response.data;
};
const updateExperience = async (data: any) => {
  const url = new Server().user("updateExperience");
  const response = await axios.patch(url, data);
  return response.data;
};
const deleteEducation = async (id: string) => {
  const url = new Server().user("deleteEducation").concat(`?id=${id}`);
  const response = await axios.delete(url);
  return response.data;
};
const deleteExperience = async (id: string) => {
  const url = new Server().user("deleteExperience").concat(`?id=${id}`);
  const response = await axios.delete(url);
  return response.data;
};
const addSkills = async (data: any) => {
  const url = new Server().user("addSkills");
  const response = await axios.post(url, data);
  return response.data;
};
const googleLogin = async (data: any): Promise<any | number> => {
  try {
    const url = new Server().auth("googleLogin");
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 403) {
      return error.response?.status;
    }
    console.log(error);
    return error;
  }
};

const updateProfilePic = async (data: any) => {
  const url = new Server().user("updateProfilePic");
  const response = await axios.post(url, data);
  return response.data;
};

const resentOtp = async ({ email }: { email: string }) => {
  const url = new Server().auth("resentOtp");
  const response = await axios.post(url, { email });
  return response.data;
};

const getUser = async (username: string) => {
  const url = new Server().user("getUser");
  const response = await axios.get(url, {
    params: {
      username,
    },
  });
  return response.data;
};

const addResume = async (data: FormData) => {
  const url = new Server().user("addResume");
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const removeResume = async (resume: string) => {
  const url = new Server().user("removeResume");
  const response = await axios.delete(url, {
    params: {
      url: resume,
    },
  });
  return response.data;
};

const updatePrimaryResume = async (primary: number) => {
  const url = new Server().user("updatePrimaryResume");
  const response = await axios.patch(url, { primary });
  return response.data;
};

const updateResumeVisibility = async (visibility: boolean) => {
  const url = new Server().user("updateResumeVisibility");
  const response = await axios.patch(url, { visibility });
  return response.data;
};

const getUsers = async (query: { q?: string; p?: number }) => {
  const url = new Server().user("getUsers");
  const response = await axios.get(url, {
    params: {
      ...query,
      p: (query.p && Number(query.p)) || 1,
    },
  });
  return response.data;
};
const userList = async (query: { q?: string; p?: number }) => {
  const url = new Server().user("userList");
  const response = await axios.get(url, {
    params: {
      ...query,
      p: (query.p && Number(query.p)) || 1,
    },
  });
  return response.data;
};

export {
  currentUser,
  updateProfile,
  updateEducation,
  addExperience,
  updateExperience,
  addSkills,
  addEducation,
  deleteEducation,
  deleteExperience,
  googleLogin,
  updateProfilePic,
  verifyUser,
  resentOtp,
  getUser,
  addResume,
  removeResume,
  updatePrimaryResume,
  updateResumeVisibility,
  getUsers,
  userList,
};
