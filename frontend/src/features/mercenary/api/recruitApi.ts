// src/features/mercenary/api/recruitApi.ts

import axiosInstance from "@/lib/axiosInstance";
import type { 
  PostType, 
  RecruitPostCreationRequestDto, 
  RecruitPostResponseDto,
  RecruitPostUpdateRequestDto
} from "@/types/recruitPost";
import type { PageResponse } from "@/types/PageResponse";
import type { ApplicationRequestDto } from '@/types/application';

const API_BASE_URL = "/api/recruit-posts";

export const fetchRecruitPosts = async (category: string, page: number = 0, size: number = 10): Promise<PostType[]> => {
  try {
    const response = await axiosInstance.get<PageResponse<PostType>>(`${API_BASE_URL}/category/${category}`, {
      params: { page, size }
    });
    return response.data.content;
  } catch (error) {
    console.error(`Error fetching recruit posts for category ${category}:`, error);
    throw error;
  }
};

export const createRecruitPostApi = async (postData: RecruitPostCreationRequestDto): Promise<RecruitPostResponseDto> => {
  try {
    const response = await axiosInstance.post<RecruitPostResponseDto>(API_BASE_URL, postData);
    return response.data;
  } catch (error: unknown) {
    // ▼▼▼ 새로운 에러 처리 방식 ▼▼▼
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || '게시글 생성 중 오류가 발생했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const deleteRecruitPostApi = async (postId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/${postId}`);
  } catch (error: unknown) {
    // ▼▼▼ 새로운 에러 처리 방식 ▼▼▼
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || '게시글 삭제 중 오류가 발생했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const updateRecruitPostApi = async (postId: number, updateData: RecruitPostUpdateRequestDto): Promise<RecruitPostResponseDto> => {
  try {
    const response = await axiosInstance.put<RecruitPostResponseDto>(`${API_BASE_URL}/${postId}`, updateData);
    return response.data;
  } catch (error: unknown) {
    // ▼▼▼ 새로운 에러 처리 방식 ▼▼▼
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || '게시글 수정 중 오류가 발생했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const applyToPostApi = async (postId: number, applicationData: ApplicationRequestDto): Promise<string> => {
  try {
    const response = await axiosInstance.post<string>(`${API_BASE_URL}/${postId}/apply`, applicationData);
    return response.data;
  } catch (error: unknown) {
    // ▼▼▼ 새로운 에러 처리 방식 ▼▼▼
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || '신청 처리 중 오류가 발생했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};