import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/types/user";

export const fetchMyProfile = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("/api/users/me");
  return response.data;
};

export const updateMyProfile = async (userData: Partial<User>): Promise<void> => {
  await axiosInstance.put("/api/users/me", userData);
};
