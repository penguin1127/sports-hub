import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { mockRecruitPosts } from "@/mock/mockRecruitPosts"
import MercenaryDetailCard from "../components/MercenaryDetailCard"

const MercenaryPage = () => {
  const { search } = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const initialFocusedId = params.get("id")
  const [focusedId, setFocusedId] = useState<string | null>(initialFocusedId)

  useEffect(() => {
    setFocusedId(initialFocusedId)
  }, [initialFocusedId])

  const posts = mockRecruitPosts.filter(p => p.category === "mercenary")

  const sortedPosts = focusedId
    ? [
        ...posts.filter(p => String(p.id) === focusedId),
        ...posts.filter(p => String(p.id) !== focusedId),
      ]
    : posts

  const handleClose = () => {
    setFocusedId(null)
    navigate("/mercenary", { replace: true })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedPosts.map(post => (
          <MercenaryDetailCard
          key={post.id}
          post={post}
          isExpanded={String(post.id) === focusedId}
          onClose={handleClose}
          onExpand={() => setFocusedId(String(post.id))}
        />
        ))}
      </div>
    </div>
  )
}

export default MercenaryPage
