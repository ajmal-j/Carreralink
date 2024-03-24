import { Server } from "../lib/server";
import axios from "./axios.interseptor";

const currentUser = async () => {
  const url = new Server().user("currentUser");
  const response = await axios.get(url);
  return response.data;
};
const currentAdmin = async () => {
  const url = new Server().user("currentAdmin");
  const response = await axios.get(url);
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
const googleLogin = async (data: any) => {
  const url = new Server().auth("googleLogin");
  const response = await axios.post(url, data);
  return response.data;
};

const updateProfilePic = async (data: any) => {
  const url = new Server().user("updateProfilePic");
  const response = await axios.post(url, data);
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
  currentAdmin,
};
