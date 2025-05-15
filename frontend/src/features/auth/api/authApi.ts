// src/features/auth/api/authApi.ts

import axiosInstance from "@/lib/axiosInstance"

/**
 * 🟢 로그인 요청 API
 * @param userid 사용자 아이디
 * @param password 비밀번호
 * @returns JWT 토큰만 반환
 */
/**
 * 로그인 요청
 */
export const loginApi = async (
  userid: string,
  password: string
): Promise<{ data: { token: string; user: any } }> => {
  return axiosInstance.post("/auth/login", { userid, password });
};


/**
 * 🟡 회원가입 요청 API
 * @param userid 사용자 아이디
 * @param password 비밀번호
 * @returns 성공 메시지 (서버 구현에 따라 변경 가능)
 */
export const signupApi = async (
  userid: string,
  password: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.post("/api/auth/signup", { userid, password })
  return response.data as { message: string }
}