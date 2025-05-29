// src/stores/useAuthStore.ts

import { create } from "zustand";
import type { UserResponseDto } from "@/types/user"; // UserResponseDto 임포트

// StoreUser 인터페이스: 스토어에 저장할 사용자 정보 필드를 정의
// UserResponseDto와 유사하게 필요한 모든 필드를 포함하도록 확장
interface StoreUser {
  id: number;
  name: string;
  userid: string;
  email?: string;
  region?: string;
  preferredPosition?: string;
  role?: string; // UserResponseDto에 있는 필드 추가
  isExPlayer?: boolean; // ✅ 추가
  phoneNumber?: string; // ✅ 추가
  activityStartDate?: string; // ✅ 추가
  activityEndDate?: string; // ✅ 추가
  birthDate?: string; // ✅ 추가
  createdAt?: string; // ✅ 추가
  updatedAt?: string; // ✅ 추가
}

interface AuthState {
  token: string | null;
  user: StoreUser | null;
  isLoggedIn: boolean;
  login: (token: string, userData: UserResponseDto) => void; // 받는 userData는 전체 UserResponseDto
  logout: () => void;
  // 필요하다면 스토어의 user 객체를 직접 업데이트하는 함수 추가
  // updateUserInStore: (updatedUserData: Partial<StoreUser>) => void;
}

const storedToken = localStorage.getItem("token");
const storedUserJson = localStorage.getItem("user");
let parsedUser: StoreUser | null = null;

if (storedUserJson && storedUserJson !== "undefined") {
  try {
    const tempParsedUser = JSON.parse(storedUserJson);
    // localStorage에서 가져온 user 객체가 StoreUser 타입에 맞는지 간단히 확인
    if (tempParsedUser && typeof tempParsedUser.id === 'number' && typeof tempParsedUser.userid === 'string') {
      parsedUser = tempParsedUser as StoreUser;
    } else {
      localStorage.removeItem("user");
    }
  } catch (e) {
    console.error("Failed to parse user from localStorage during store initialization", e);
    localStorage.removeItem("user");
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken ?? null,
  user: parsedUser,
  isLoggedIn: !!storedToken && !!parsedUser,

  login: (token, userData) => { // userData는 UserResponseDto 타입
    // UserResponseDto에서 StoreUser에 필요한 모든 필드를 매핑
    const userToStore: StoreUser = {
      id: userData.id,
      name: userData.name,
      userid: userData.userid,
      email: userData.email,
      region: userData.region,
      preferredPosition: userData.preferredPosition,
      role: userData.role,
      isExPlayer: userData.isExPlayer,
      phoneNumber: userData.phoneNumber,
      activityStartDate: userData.activityStartDate,
      activityEndDate: userData.activityEndDate,
      birthDate: userData.birthDate,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userToStore));
    set({ token, user: userToStore, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isLoggedIn: false });
  },

  // 예시: 스토어의 사용자 정보만 업데이트하는 함수 (선택 사항)
  /*
  updateUserInStore: (updatedUserData) => {
    set((state) => {
      if (state.user) {
        const newUser = { ...state.user, ...updatedUserData };
        localStorage.setItem("user", JSON.stringify(newUser));
        return { user: newUser };
      }
      return {};
    });
  },
  */
}));