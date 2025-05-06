import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoggedIn: false,
  login: (token) => {
    localStorage.setItem('token', token);
    set({ token, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isLoggedIn: false });
  },
}));
