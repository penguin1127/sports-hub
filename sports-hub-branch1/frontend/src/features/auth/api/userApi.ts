// src/features/user/api/userApi.ts (또는 authApi.ts와 통합된 위치)

import axiosInstance from "@/lib/axiosInstance";
import type { User, UserProfileUpdateDto, PublicUserProfileResponseDto } from "@/types/user"; // UserProfileUpdateDto 및 PublicUserProfileResponseDto 추가

const API_USERS_BASE_URL = "/api/users";

/**
 * 🔐 내 정보 조회 API (/me)
 */
export const getMyProfileApi = async (): Promise<User> => {
  const response = await axiosInstance.get<User>(`${API_USERS_BASE_URL}/me`);
  return response.data;
};

/**
 * ⚙️ 내 정보 수정 API
 * @param updatedData 변경할 유저 정보
 */
export const updateMyProfileApi = async (updatedData: Partial<UserProfileUpdateDto>): Promise<User> => {
  // UserProfileUpdateDto는 UserProfileUpdateDtoType 대신 사용 (타입 정의 일관성)
  const response = await axiosInstance.put<User>(`${API_USERS_BASE_URL}/me`, updatedData);
  return response.data;
};

/**
 * 🙋‍♂️ 특정 사용자의 공개 프로필 정보 조회 API
 * @param userId 조회할 사용자의 ID
 */
export const fetchPublicUserProfileApi = async (userId: number | string): Promise<PublicUserProfileResponseDto> => {
  try {
    console.log(`[userApi] Fetching public profile for userId: ${userId}`); // API 호출 확인용 로그
    const response = await axiosInstance.get<PublicUserProfileResponseDto>(`${API_USERS_BASE_URL}/${userId}/profile`);
    console.log("[userApi] Profile data received:", response.data); // 응답 데이터 확인용 로그
    return response.data;
  } catch (error) {
    console.error(`[userApi] Error fetching public user profile for ID ${userId}:`, error);
    throw error;
  }
};