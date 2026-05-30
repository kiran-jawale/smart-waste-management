import axios from "axios";

// The trailing slash is MANDATORY for Axios to resolve relative paths correctly
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v2";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() };
  const timestamp = config.metadata.startTime.toISOString();
  console.log(`\n[🚀 Frontend Req] ${timestamp} | ${config.method.toUpperCase()} ${config.url}\n`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  const endTime = new Date();
  const duration = endTime - response.config.metadata.startTime;
  const timestamp = endTime.toISOString();
  console.log(`\n[✅ Frontend Res] ${timestamp} | ${response.config.method.toUpperCase()} ${response.config.url} - Status: ${response.status} (${duration}ms)\n`);
  return response;
}, (error) => {
  const endTime = new Date();
  const duration = endTime - error.config.metadata.startTime;
  const timestamp = endTime.toISOString();
  console.error(`\n[❌ Frontend Err] ${timestamp} | ${error.config.method.toUpperCase()} ${error.config.url} - Status: ${error.response?.status} (${duration}ms)\n`);
  return Promise.reject(error);
});

export default api;