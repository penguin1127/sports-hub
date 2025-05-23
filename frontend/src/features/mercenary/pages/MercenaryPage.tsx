// src/features/mercenary/pages/MercenaryPage.tsx

import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore"
import { useRecruitStore } from "@/stores/useRecruitStore"
import { PostType } from "@/types/recruitPost"
import MercenaryDetailCard from "../components/MercenaryDetailCard"
import NewPostModal from "../components/NewPostModal"

const MercenaryPage = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const initialId = params.get("id")

  // Zustand 스토어
  const user = useAuthStore((s) => s.user)
  const posts = useRecruitStore((s) => s.posts)
  const loadPosts = useRecruitStore((s) => s.loadPosts)
  const createPost = useRecruitStore((s) => s.createPost)
  const removePost = useRecruitStore((s) => s.removePost)

  const [focusedId, setFocusedId] = useState<string | null>(initialId)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  useEffect(() => {
    setFocusedId(initialId)
  }, [initialId])

  // 새 글 등록 시 실행
  const handleCreate = (post: PostType) => {
    createPost(post)
  }

  // 카드 삭제
  const handleDelete = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      removePost(id)
    }
  }

  // 카드 정렬: 선택한 카드 우선 표시
  const sortedPosts = focusedId
    ? [
        ...posts.filter((p) => String(p.id) === focusedId),
        ...posts.filter((p) => String(p.id) !== focusedId),
      ]
    : posts

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 글 등록 버튼 */}
      <div className="mb-6 text-right">
        <button
          onClick={() => {
            if (!user) {
              alert("로그인이 필요합니다.")
              return
            }
            setModalOpen(true)
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          ✏️ 글 등록
        </button>
      </div>

      {/* 작성 모달 */}
      {isModalOpen && (
        <NewPostModal
          category="mercenary"
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedPosts.map((post) => (
          <MercenaryDetailCard
            key={post.id}
            post={post}
            isExpanded={String(post.id) === focusedId}
            onExpand={() => setFocusedId(String(post.id))}
            onClose={() => setFocusedId(null)}
            onDelete={
              user?.name === post.author ? () => handleDelete(post.id) : undefined
            }
          />
        ))}
      </div>
    </div>
  )
}

export default MercenaryPage
