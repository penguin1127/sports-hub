// 📁 src/features/mercenary/pages/MercenaryPage.tsx
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MercenaryDetailCard from "../components/MercenaryDetailCard"
import NewPostModal from "../components/NewPostModal" // ✅ 등록 모달
import { useAuthStore } from "@/stores/useAuthStore"
import { useRecruitStore } from "@/stores/useRecruitStore"
import { PostType } from "@/types/recruitPost"

const MercenaryPage = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const initialId = params.get("id")

  // 🔑 Zustand 스토어에서 상태 불러오기
  const user = useAuthStore((s) => s.user)
  const posts = useRecruitStore((s) => s.posts)
  const loadPosts = useRecruitStore((s) => s.loadPosts)
  const addPost = useRecruitStore((s) => s.addPost)
  const removePost = useRecruitStore((s) => s.removePost)

  // 🔍 카드 선택 상태
  const [focusedId, setFocusedId] = useState<string | null>(initialId)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setFocusedId(initialId)
  }, [initialId])

  useEffect(() => {
    loadPosts()
  }, [])

  const handleDelete = (id: number) => {
    removePost(id)
  }

  const handleCreate = (post: PostType) => {
    addPost(post)
  }

  const sortedPosts = focusedId
    ? [...posts.filter((p) => String(p.id) === focusedId), ...posts.filter((p) => String(p.id) !== focusedId)]
    : posts

  const handleClose = () => {
    setFocusedId(null)
    navigate("/mercenary", { replace: true })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 글 등록 버튼 */}
      <div className="mb-6 text-right">
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          ✏️ 등록
        </button>
      </div>

      {/* 글 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedPosts.map((post) => (
          <MercenaryDetailCard
            key={post.id}
            post={post}
            isExpanded={String(post.id) === focusedId}
            onClose={handleClose}
            onExpand={() => setFocusedId(String(post.id))}
            onDelete={user?.name === post.author ? () => handleDelete(post.id) : undefined}
          />
        ))}
      </div>

      {/* 글 작성 모달 */}
      {isModalOpen && (
        <NewPostModal
          category="mercenary"
          onClose={() => setModalOpen(false)}
          onSubmit={(post: PostType) => {
            handleCreate(post)
            setModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default MercenaryPage
