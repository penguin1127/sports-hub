// src/features/auth/api/authApi.ts
import axiosInstance from '@/lib/axiosInstance';

export const loginApi = async (userid: string, password: string) => {
  const response = await axiosInstance.post('/api/auth/login', {
    userid,
    password,
  });
  return response;
};

export const logoutApi = async () => {
  // 백엔드에 로그아웃 엔드포인트가 없다면 생략 가능
  // 예시:
  // await axiosInstance.post('/api/auth/logout');
};
