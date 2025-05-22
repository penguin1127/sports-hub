// src/stores/useAuthStore.ts

import { create } from "zustand";

interface User {
  id: number;
  name: string;
  userid: string;
  region?: string;
  preferredPosition?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// 🔐 초기화 시 localStorage에서 token과 user 복구
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
const parsedUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken ?? null,
  user: parsedUser,
  isLoggedIn: !!storedToken && !!parsedUser,

  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isLoggedIn: false });
  },
}));
