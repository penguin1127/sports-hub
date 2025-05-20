// src/features/mercenary/api/recruitApi.ts
import axiosInstance from "@/lib/axiosInstance"
import type { PostType } from "@/types/recruitPost"

/**
 * 용병 모집글만(category=mercenary) 가져오는 API 호출
 */
export async function fetchRecruitPosts(): Promise<PostType[]> {
  const res = await axiosInstance.get<PostType[]>(
    "/api/recruit-posts?category=mercenary"
  )
  return res.data
}
