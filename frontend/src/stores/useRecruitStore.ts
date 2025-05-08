// src/stores/useRecruitStore.ts
import { create } from "zustand"
import { fetchRecruitPosts } from "@/features/mercenary/api/recruitApi"
import type { PostType } from "@/types/recruitPost"

interface RecruitState {
  posts: PostType[]
  loadPosts: () => Promise<void>
  addPost: (post: PostType) => void  
  removePost: (id: number) => void
}

export const useRecruitStore = create<RecruitState>((set, get) => ({
  // 1) 초기 상태
  posts: [],

  // 2) 데이터 로드 액션
  loadPosts: async () => {
    try {
      const data = await fetchRecruitPosts()
      set({ posts: data })
    } catch (err) {
      console.error("용병 모집글 로드 실패:", err)
    }
  },

  addPost: (post) => {
    set({ posts: [post, ...get().posts] })
  },

  // 3) 삭제 액션: get()으로 현재 상태(posts)를 꺼내고, filter 후 set
  removePost: (id: number) => {
    const current = get().posts
    set({ posts: current.filter((p: PostType) => p.id !== id) })
  },
}))
