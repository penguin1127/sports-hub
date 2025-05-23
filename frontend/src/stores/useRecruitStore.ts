// src/stores/useRecruitStore.ts

import { create } from "zustand"
import { PostType } from "@/types/recruitPost"
import { fetchRecruitPosts } from "@/features/mercenary/api/recruitApi"

interface RecruitState {
  posts: PostType[]
  loadPosts: () => Promise<void>
  createPost: (post: PostType) => void
  removePost: (id: number) => void
}

export const useRecruitStore = create<RecruitState>((set, get) => ({
  posts: [],

  // 게시글 리스트 로딩
  loadPosts: async () => {
    try {
      const data = await fetchRecruitPosts()
      set({ posts: data })
    } catch (err) {
      console.error("용병 모집글 로드 실패:", err)
    }
  },

  // 새 게시글 추가
  createPost: (post) => {
    set({ posts: [post, ...get().posts] })
  },

  // 게시글 삭제
  removePost: (id) => {
    set({ posts: get().posts.filter((p) => p.id !== id) })
  },
}))
