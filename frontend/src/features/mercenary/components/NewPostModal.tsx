import { useState } from "react"
import type { PostType } from "@/types/recruitPost"
import { useAuthStore } from "@/stores/useAuthStore"

type Props = {
  category: PostType["category"]
  onClose: () => void
  onSubmit: (post: PostType) => void
}

export default function NewPostModal({
  category,
  onClose,
  onSubmit,
}: Props) {
  const user = useAuthStore((s) => s.user)
  if (!user) {
    alert("로그인이 필요합니다.")
    onClose()
    return null
  }

  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [region, setRegion] = useState<string>("")

  const nowIso = new Date().toISOString()
  const date = nowIso.split("T")[0] || ""
  const time = nowIso.split("T")[1]?.slice(0, 5) || ""

  const handleSubmit = () => {
    const newPost: PostType = {
      id: Date.now(),
      title,
      content,
      region,
      author: user.name,
      created_at: nowIso,
      category,
      target_type: "user",
      date,
      time,
      status: "open",
      thumbnail_url: "",
      description: content,
      image: "",
      from: user.name,
      to: "",
    }
    onSubmit(newPost)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">새 모집글 작성</h2>

        <label className="block mb-2">
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </label>

        <label className="block mb-2">
          내용
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1 h-24"
          />
        </label>

        <label className="block mb-4">
          지역
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </label>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  )
}
