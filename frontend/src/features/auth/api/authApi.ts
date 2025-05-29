// src/features/auth/api/authApi.ts

import axiosInstance from "@/lib/axiosInstance";

export const loginApi = async (
  userid: string,
  password: string
): Promise<{ data: { token: string; user: any } }> => {
  return axiosInstance.post("/api/auth/login", { userid, password });
};

export const signupApi = async (
  userid: string,
  password: string
): Promise<{ data: string }> => {
  return axiosInstance.post("/api/auth/signup", { userid, password });
};
