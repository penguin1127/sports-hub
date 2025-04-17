// ✅ src/features/mercenary/components/MercenaryDetailCard.tsx
import { PostType } from "@/mock/mockRecruitPosts"

type Props = {
  post: PostType
  isExpanded?: boolean
}

const MercenaryDetailCard = ({ post, isExpanded = false }: Props) => {
  return (
    <div
      className={`border rounded-lg bg-white overflow-hidden shadow transition-all duration-300 ${
        isExpanded ? "p-6" : "p-4"
      }`}
    >
      <img
        src={post.thumbnail_url}
        alt={post.title}
        className={`${isExpanded ? "h-60" : "h-40"} w-full object-cover`}
      />

      <div className="mt-4 space-y-2">
        <div className="text-sm text-gray-500">
          {post.target_type === "team" ? "[개인 → 팀]" : "[팀 → 개인]"}
        </div>

        <h2 className={`${isExpanded ? "text-2xl" : "text-lg"} font-semibold`}>{post.title}</h2>

        <p className="text-sm text-gray-600">
          {post.region} · {post.date} {post.time}
        </p>

        {isExpanded && (
          <p className="text-gray-700 whitespace-pre-wrap mt-2">{post.description}</p>
        )}
      </div>
    </div>
  )
}

export default MercenaryDetailCard
