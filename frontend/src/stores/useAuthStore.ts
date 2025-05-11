import { create } from "zustand";

interface User {
  id: number;
  userid: string;
  name: string;
  email?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// 🔁 localStorage에서 초기값 불러오기
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
const parsedUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken ?? null,
  user: parsedUser,
  isLoggedIn: !!storedToken && !!parsedUser,

  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // ✅ 직렬화하여 저장
    set({ token, user, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isLoggedIn: false });
  },
}));
