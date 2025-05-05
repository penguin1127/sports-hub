// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { loginApi, logoutApi } from '@/features/auth/api/authApi';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (userid: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (userid, password) => {
    try {
      const response = await loginApi(userid, password);
      const token = response.data.token;

      localStorage.setItem('token', token);
      set({ token, isAuthenticated: true });
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutApi(); // 실제 로그아웃 API가 없으면 생략해도 됨
    } finally {
      localStorage.removeItem('token');
      set({ token: null, isAuthenticated: false });
    }
  },
}));
