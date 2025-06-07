// src/components/mercenary/MercenaryCard.tsx

import type { PostType } from "@/types/recruitPost"

type Props = {
  post: PostType
  onClick: () => void
}

const MercenaryCard = ({ post, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg shadow hover:shadow-md transition bg-white overflow-hidden"
    >
      {/* post.thumbnail_url -> post.thumbnailUrl */}
      <img src={post.thumbnailUrl} alt={post.title} className="h-40 w-full object-cover" />
      <div className="p-4 space-y-1">
        {/* targetType이 USER면 "개인 -> 팀", TEAM이면 "팀 -> 개인" (백엔드 Enum과 맞춤) */}
        <div className="text-sm text-gray-500">[{post.targetType === "USER" ? "팀 → 개인" : "개인 → 팀"}]</div>
        <h3 className="text-lg font-semibold truncate">{post.title}</h3>
        {/* post.date -> post.gameDate, post.time -> post.gameTime */}
        <p className="text-sm text-gray-600">{post.region} ・ {post.gameDate} {post.gameTime}</p>
        {/* post.author -> post.authorName */}
        <p className="text-sm text-gray-500">작성자: {post.authorName}</p>
      </div>
    </div>
  )
}

export default MercenaryCard