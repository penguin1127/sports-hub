// src/features/mercenary/api/recruitApi.ts (또는 recruitApi.ts)

import axiosInstance from "@/lib/axiosInstance"; // axiosInstance 경로 확인
import { PostType, RecruitPostCreationRequestDto,RecruitPostResponseDto } from "@/types/recruitPost";
import { PageResponse } from "@/types/PageResponse";

const API_BASE_URL = "http://localhost:8080/api/recruit-posts";

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

/**
 * 새로운 모집 게시글 생성 API 호출 함수
 * @param postData 생성할 게시글 데이터 (RecruitPostCreationRequestDto 타입)
 * @returns 생성된 게시글 정보 (PostType 또는 RecruitPostResponseDto 타입)
 */
export const createRecruitPostApi = async (
  postData: RecruitPostCreationRequestDto
): Promise<RecruitPostResponseDto> => {
  try {
    // 백엔드의 POST /api/recruit-posts 엔드포인트를 호출합니다.
    const response = await axiosInstance.post<RecruitPostResponseDto>(
      "/api/recruit-posts",
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating recruit post:", error);
    // 에러를 그대로 던져서 호출한 쪽에서 처리하도록 합니다.
    throw error;
  }
};