import axiosInstance from "@/lib/axiosInstance";

/** 사용자 타입 정의 */
interface User {
  id: number;
  userid: string;
  name: string;
  email?: string;
  // 필요한 경우, 추가 필드 작성 가능
}

/**
 * 로그인 요청
 * @param userid 사용자 ID
 * @param password 비밀번호
 * @returns JWT 토큰과 사용자 정보
 */
export const loginApi = async (
  userid: string,
  password: string
): Promise<{ data: { token: string; user: User } }> => {
  return axiosInstance.post("/api/auth/login", { userid, password });
};

/**
 * 회원가입 요청
 */
export const signupApi = async (
  userid: string,
  password: string
): Promise<{ data: string }> => {
  return axiosInstance.post("/api/auth/signup", { userid, password });
};

/**
 * 로그아웃 요청 (서버 필요 시)
 */
export const logoutApi = async () => {
  // 서버에 로그아웃 API가 있다면 여기에 작성
};
