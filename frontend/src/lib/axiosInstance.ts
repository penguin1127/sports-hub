// src/lib/axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 시 자동으로 JWT 토큰을 헤더에 포함
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // 로그인/회원가입 요청엔 토큰 제외
    const isAuthRequest = config.url?.startsWith("/auth");

    if (token && !isAuthRequest) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
