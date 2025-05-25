// src/features/mercenary/api/recruitApi.ts

import axios from "axios"
import { PostType } from "@/types/recruitPost" // 수정된 PostType 임포트
import { PageResponse } from "@/types/PageResponse"; // 새로 정의한 PageResponse 타입 임포트

const API_BASE_URL = "http://localhost:8080/api/recruit-posts"

export const fetchRecruitPosts = async (category: string, page: number = 0, size: number = 10): Promise<PostType[]> => {
  try {
    // axios.get<PageResponse<PostType>>: 응답 데이터의 타입을 PageResponse<PostType>으로 명시
    const response = await axios.get<PageResponse<PostType>>(`${API_BASE_URL}/category/${category}`, {
      params: {
        page: page,
        size: size
      }
    })
    // response.data가 PageResponse<PostType> 타입이므로 content 속성에 안전하게 접근
    return response.data.content
  } catch (error) {
    console.error(`Error fetching recruit posts for category ${category}:`, error)
    throw error
  }
}

// 전체 모집글 조회 (필요하다면 유지)
export const fetchAllRecruitPosts = async (): Promise<PostType[]> => {
    try {
        // 전체 조회는 Page 객체가 아닐 수 있으므로 PostType[]으로 직접 명시
        const response = await axios.get<PostType[]>(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching all recruit posts:", error);
        throw error;
    }
};

// 기타 API 호출 함수들 (예: 게시글 생성, 삭제 등)
// ...