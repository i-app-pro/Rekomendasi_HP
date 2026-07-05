import axios from "axios";

// Ganti baseURL sesuai alamat backend kamu (Laravel/Express/dll)
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
});