import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://smart-peepal.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
