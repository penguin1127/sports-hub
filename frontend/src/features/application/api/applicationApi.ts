// src/features/application/api/applicationApi.ts

import axiosInstance from "@/lib/axiosInstance";
import type { MyApplication } from "@/types/application";

/**
 * 내 신청 내역 목록 조회 API
 */
export const getMyApplicationsApi = async (): Promise<MyApplication[]> => {
  try {
    const response = await axiosInstance.get<MyApplication[]>('/api/applications/my');
    return response.data;
  } catch (error: unknown) {
    // ▼▼▼ 라이브러리 버전에 영향받지 않는 안전한 에러 처리 ▼▼▼
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || '신청 내역을 불러오는 데 실패했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

/**
 * 내 신청 취소 API
 * @param applicationId 취소할 신청의 ID
 */
export const cancelApplicationApi = async (applicationId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/applications/${applicationId}`);
  } catch (error: unknown) {
    // ▼▼▼ 라이브러리 버전에 영향받지 않는 안전한 에러 처리 ▼▼▼
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || '신청 취소 중 오류가 발생했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};