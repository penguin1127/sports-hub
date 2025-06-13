// src/features/mercenary/api/recruitApi.ts (또는 recruitApi.ts)

import axiosInstance from "@/lib/axiosInstance"; // axiosInstance 경로 확인
import { PostType, RecruitCategory, RecruitPostCreationRequestDto } from "@/types/recruitPost";
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

// ... (fetchAllRecruitPosts 함수는 필요시 유지) ...

/**
 * 새로운 모집 게시글 생성 API 호출 함수
 * @param postData 생성할 게시글 데이터 (RecruitPostCreationRequestDto 타입)
 * @returns 생성된 게시글 정보 (PostType 또는 RecruitPostResponseDto 타입)
 */
export const createRecruitPostApi = async (postData: RecruitPostCreationRequestDto): Promise<PostType> => {
  try {
    // 백엔드 Controller의 @PostMapping이 받는 타입이 RecruitPost 엔티티이므로,
    // 프론트에서 보내는 DTO와 필드가 최대한 유사해야 하며,
    // 백엔드에서 이 DTO를 RecruitPost 엔티티로 변환하여 저장해야 합니다.
    // 현재 RecruitPostController는 @RequestBody RecruitPost recruitPost로 받고 있으므로,
    // 이 DTO는 RecruitPost 엔티티의 필드와 거의 일치해야 합니다.
    // (authorId 대신 author 객체를 보내거나, 백엔드에서 authorId로 User를 찾아 설정)
    // 여기서는 RecruitPostCreationRequestDto를 보내고 백엔드에서 처리한다고 가정합니다.
    console.log("[recruitApi] Creating post with data:", JSON.stringify(postData, null, 2));
    const response = await axiosInstance.post<PostType>(`${API_BASE_URL}`, postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating recruit post:", error);
    throw error;
  }
};