// src/features/auth/api/authApi.ts

import axiosInstance from "@/lib/axiosInstance";
import {
  UserSignUpRequestDto,
  UserLoginRequestDto,
  AuthResponseDto, // user.ts의 AuthResponseDto 사용
} from "@/types/user";

const API_BASE_URL = "/api/auth"; // 실제 백엔드 엔드포인트에 맞게 수정

export const signupApi = async (userData: UserSignUpRequestDto): Promise<any> => { // 실제 응답 타입으로 변경 권장
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/signup`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json'
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
    const response = await axiosInstance.post<AuthResponseDto>( // 반환 타입을 AuthResponseDto로 명시
      `${API_BASE_URL}/login`,
      credentials, // { userid: "...", password: "..." } 형태
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data; // Axios 응답의 data 필드가 AuthResponseDto 타입임을 가정
  } catch (error) {
    console.error("Error in loginApi:", error);
    throw error;
  }
};