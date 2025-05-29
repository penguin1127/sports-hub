// src/features/auth/api/authApi.ts (또는 실제 경로)

import axiosInstance from "@/lib/axiosInstance";
import { UserSignUpRequestDto, UserLoginRequestDto, AuthResponseDto } from "@/types/user";

const API_BASE_URL = "/api/auth";

export const signupApi = async (userData: UserSignUpRequestDto): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/signup`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json' // JSON 형식으로 요청
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in signupApi:", error);
    throw error;
  }
};

export const loginApi = async (credentials: UserLoginRequestDto): Promise<AuthResponseDto> => {
  try {
    const response = await axiosInstance.post<AuthResponseDto>(
      `${API_BASE_URL}/login`,
      credentials, // 요청 본문 데이터 ( { userid: "...", password: "..." } 형태)
      { // 요청 설정 객체
        headers: {
          'Content-Type': 'application/json' // 👈 Content-Type을 JSON으로 명시
        }
      }
    );
    return response.data;
  } catch (error) { // authApi.ts:51 (로그에 나온 라인)
    console.error("Error in loginApi:", error); // authApi.ts:51 (로그에 나온 라인)
    throw error;
  }
};