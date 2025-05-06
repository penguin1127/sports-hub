import axiosInstance from "@/lib/axiosInstance";

/**
 * 로그인 요청
 * @param userid 사용자 ID
 * @param password 비밀번호
 * @returns JWT 토큰 포함 응답
 */
export const loginApi = async (
  userid: string,
  password: string
): Promise<{ data: { token: string } }> => {
  return axiosInstance.post("/api/auth/login", { userid, password });
};

/**
 * 회원가입 요청
 * @param userid 사용자 ID
 * @param password 비밀번호
 * @returns 성공 메시지 응답
 */
export const signupApi = async (
  userid: string,
  password: string
): Promise<{ data: string }> => {
  return axiosInstance.post("/api/auth/signup", { userid, password });
};

/**
 * 로그아웃 요청 (서버 연동용이 아니라면 생략 가능)
 * 현재는 토큰 제거 등 클라이언트 처리로 충분함
 */
export const logoutApi = async () => {
  // 서버에 로그아웃 엔드포인트가 있다면 여기에 요청
  // await axiosInstance.post("/api/auth/logout");
};


