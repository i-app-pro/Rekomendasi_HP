import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginPayload, RegisterPayload } from "../types/auth";
import { loginRequest, registerRequest } from "../api/auth";
import { getErrorMessage } from "../lib/errorMessage";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
  clearError: () => void;
}

// Catatan: setelah ganti role user (customers <-> admin) di database,
// user WAJIB login ulang (sesuai README) supaya token JWT baru terbit
// dengan role yang benar.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await loginRequest(payload);
          set({ token, user, isAuthenticated: true, isLoading: false });
          return user;
        } catch (err) {
          const message = getErrorMessage(err, "Email atau password salah");
          set({ isLoading: false, error: message });
          throw new Error(message);
        }
      },

      register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await registerRequest(payload);
          set({ token, user, isAuthenticated: true, isLoading: false });
          return user;
        } catch (err) {
          const message = getErrorMessage(err, "Registrasi gagal, coba lagi");
          set({ isLoading: false, error: message });
          throw new Error(message);
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "rekophone-auth", // key di localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);