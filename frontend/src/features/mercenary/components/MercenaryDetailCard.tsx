// src/components/mercenary/MercenaryDetailCard.tsx

import type { PostType } from "@/types/recruitPost"
import { RecruitTargetType } from "@/types/recruitPost"; // RecruitTargetType import 추가

type Props = {
  post: PostType
  isExpanded: boolean
  onClose?: () => void
  onExpand?: () => void
  onDelete?: () => void
}

const MercenaryDetailCard = ({ post, isExpanded, onClose, onExpand, onDelete}: Props) => {
  return (
    <div
      onClick={() => {
        if (!isExpanded && onExpand) onExpand()
      }}
      className={`border rounded shadow-sm transition-all bg-white cursor-pointer ${isExpanded ? "col-span-full p-6" : "p-3"
        }`}
    >
      {/* post.thumbnail_url -> post.thumbnailUrl */}
      <img
        src={post.thumbnailUrl}
        alt={post.title}
        className="w-full h-48 object-cover rounded"
      />

      <div className="mt-2 text-sm text-gray-500">
        {/* post.target_type -> post.targetType */}
        [{post.targetType === RecruitTargetType.USER ? "팀 → 개인" : "개인 → 팀"}]
      </div>

      <h3 className="text-lg font-semibold mt-1">{post.title}</h3>

      <div className="text-sm text-gray-600">
        {/* post.date -> post.gameDate, post.time -> post.gameTime */}
        {post.region} · {post.gameDate} {post.gameTime}
      </div>

      {isExpanded && (
        <>
          {/* post.description -> post.content */}
          <p className="mt-2 text-sm text-gray-800">{post.content}</p>
          <div className="flex space-x-4 mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose?.()
              }}
              className="text-sm text-blue-500 underline"
            >
              닫기
            </button>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="text-sm text-red-500 underline"
              >
                삭제
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default MercenaryDetailCard