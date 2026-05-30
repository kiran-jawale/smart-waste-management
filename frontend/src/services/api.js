import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1/";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() };
  console.log(`[🚀 Frontend Req] ${config.method.toUpperCase()} ${config.url}`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Latency
api.interceptors.response.use((response) => {
  const endTime = new Date();
  const duration = endTime - response.config.metadata.startTime;
  console.log(`[✅ Frontend Res] ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);
  return response;
}, (error) => {
  const endTime = new Date();
  const duration = endTime - error.config.metadata.startTime;
  console.error(`[❌ Frontend Err] ${error.config.method.toUpperCase()} ${error.config.url} - ${error.response?.status} (${duration}ms)`);
  return Promise.reject(error);
});

export default api;