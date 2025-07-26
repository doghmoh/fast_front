import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
