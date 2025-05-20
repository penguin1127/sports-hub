// src/features/auth/api/userApi.ts

import axiosInstance from "@/lib/axiosInstance"
import { User } from "@/types/user"

/**
 * 🔐 내 정보 조회 API (/me)
 * - 로그인된 사용자의 정보를 가져옴
 * - Authorization 헤더에 토큰이 자동 포함되어야 함
 */
export const getMyProfile = async (): Promise<User> => {
  const response = await axiosInstance.get("/api/users/me")
  return response.data as User
}

/**
 * ⚙️ 내 정보 수정 API
 * - PUT 또는 PATCH 방식 사용 가능
 * @param updatedData 변경할 유저 정보
 */
export const updateMyProfile = async (updatedData: Partial<User>): Promise<User> => {
  const response = await axiosInstance.put("/api/users/me", updatedData)
  return response.data as User
}
