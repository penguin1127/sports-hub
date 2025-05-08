// src/stores/useAuthStore.ts
import { create } from "zustand"

interface User {
  name: string
  // 필요 시 email, id 등 추가
}

interface AuthState {
  token: string | null
  user: User | null
  isLoggedIn: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

// localStorage 복원용 초기값
const storedToken = localStorage.getItem("token")
const storedUser = localStorage.getItem("user")

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoggedIn: !!storedToken,

  login: (token, user) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))  // ✅ 추가 저장
    set({ token, user, isLoggedIn: true })
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")  // ✅ 추가 제거
    set({ token: null, user: null, isLoggedIn: false })
  },
}))
