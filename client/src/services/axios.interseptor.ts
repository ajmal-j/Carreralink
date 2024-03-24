import axios from "axios";

axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userToken = localStorage.getItem("userToken") || "";
    const companyToken = localStorage.getItem("companyToken") || "";
    const adminToken = localStorage.getItem("adminToken") || "";
    config.headers.Authorization = `Bearer ${userToken}`;
    config.headers.CompanyToken = `Bearer ${companyToken}`;
    config.headers.AdminToken = `Bearer ${adminToken}`;
  }
  return config;
});

axios.defaults.withCredentials = true;

export default axios;
