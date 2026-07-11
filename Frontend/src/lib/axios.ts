import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

// Backend Express (lihat README): default jalan di http://localhost:3000, prefix /api
// Override lewat .env -> VITE_API_BASE_URL=http://localhost:3000/api
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});

// Selipkan token JWT ke setiap request (kalau user sudah login)
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Kalau token expired / invalid (401), otomatis logout & lempar ke halaman login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().logout();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
