// ✅ src/features/mercenary/pages/MercenaryPage.tsx
import { useLocation } from "react-router-dom"
import { mockRecruitPosts } from "@/mock/mockRecruitPosts"
import MercenaryDetailCard from "../components/MercenaryDetailCard"

const MercenaryPage = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const focusedId = params.get("id")

  const mercenaryPosts = mockRecruitPosts.filter((p) => p.category === "mercenary")

  const sortedPosts = [
    ...mercenaryPosts.filter((p) => String(p.id) === focusedId),
    ...mercenaryPosts.filter((p) => String(p.id) !== focusedId),
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {sortedPosts.map((post) => (
        <div key={post.id} className={String(post.id) === focusedId ? "col-span-full" : ""}>
          <MercenaryDetailCard post={post} isExpanded={String(post.id) === focusedId} />
        </div>
      ))}
    </div>
  )
}

export default MercenaryPage
