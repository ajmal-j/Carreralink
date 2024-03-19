import axios from "axios";

axios.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("userToken") || "";
  config.headers.Authorization = `Bearer ${userToken}`;
  return config;
});

axios.defaults.withCredentials = true;

export default axios;
