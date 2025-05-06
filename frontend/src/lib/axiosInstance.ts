// src/lib/axiosInstance.ts
import axios from 'axios';

// 로컬 스토리지에서 토큰 가져오기
const getToken = () => {
  return localStorage.getItem('token');
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 API 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Authorization 헤더에 토큰 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 에러 로깅 등
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('인증 오류: 로그인 필요');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
