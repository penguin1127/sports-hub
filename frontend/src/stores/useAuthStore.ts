// src/stores/useAuthStore.ts

import { create } from "zustand";
import type { User as AppUserType } from "@/types/user"; // User 타입 임포트 (이름 충돌 방지 위해 AppUserType으로)

// useAuthStore 내부에서 사용할 User 타입 (AppUserType의 부분집합 또는 동일하게)
interface StoreUser {
  id: number;
  name: string;
  userid: string; //  @/types/user.ts 의 User.userid 와 일치
  region?: string;
  preferredPosition?: string;
  // AppUserType의 다른 필요한 필드들을 여기에 추가할 수 있음
  email?: string; // 예시: email도 스토어에 저장한다면
}

interface AuthState {
  token: string | null;
  user: StoreUser | null; // 스토어 내부 User 타입 사용
  isLoggedIn: boolean;
  login: (token: string, userData: AppUserType) => void; // 받는 user 데이터는 AppUserType
  logout: () => void;
}

const storedToken = localStorage.getItem("token");
const storedUserJson = localStorage.getItem("user");
let parsedUser: StoreUser | null = null;

if (storedUserJson && storedUserJson !== "undefined") {
  try {
    const tempParsedUser = JSON.parse(storedUserJson);
    // localStorage에서 가져온 user 객체가 StoreUser 타입에 맞는지 간단히 확인
    if (tempParsedUser && typeof tempParsedUser.id === 'number' && typeof tempParsedUser.name === 'string' && typeof tempParsedUser.userid === 'string') {
      parsedUser = tempParsedUser as StoreUser;
    }
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    // 손상된 데이터는 제거
    localStorage.removeItem("user");
  }
}


export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken ?? null,
  user: parsedUser,
  isLoggedIn: !!storedToken && !!parsedUser,

  login: (token, userData) => { // userData는 AppUserType (User 인터페이스 전체)
    // 스토어에 저장할 user 객체 (StoreUser 타입에 맞게 필요한 정보만 선택 또는 매핑)
    const userToStore: StoreUser = {
      id: userData.id,
      name: userData.name,
      userid: userData.userid, // AppUserType의 userid를 StoreUser의 userid로
      region: userData.region,
      preferredPosition: userData.preferredPosition,
      email: userData.email, // 예시: email도 스토어에 저장
      // 필요한 다른 필드들도 userData에서 가져와 할당
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
}));