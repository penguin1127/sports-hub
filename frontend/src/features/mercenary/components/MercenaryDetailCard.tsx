import { PostType } from "@/mock/mockRecruitPosts"

type Props = {
  post: PostType
  isExpanded: boolean
  onClose?: () => void
  onExpand?: () => void
}

const MercenaryDetailCard = ({ post, isExpanded, onClose, onExpand }: Props) => {
  return (
    <div
      onClick={() => {
        if (!isExpanded && onExpand) onExpand()
      }}
      className={`border rounded shadow-sm transition-all bg-white cursor-pointer ${
        isExpanded ? "col-span-full p-6" : "p-3"
      }`}
    >
      <img
        src={post.thumbnail_url}
        alt={post.title}
        className="w-full h-48 object-cover rounded"
      />

      <div className="mt-2 text-sm text-gray-500">
        [{post.target_type === "user" ? "팀 → 개인" : "개인 → 팀"}]
      </div>

      <h3 className="text-lg font-semibold mt-1">{post.title}</h3>

      <div className="text-sm text-gray-600">
        {post.region} · {post.date} {post.time}
      </div>

      {isExpanded && (
        <>
          <p className="mt-2 text-sm text-gray-800">{post.description}</p>
          <button
            onClick={(e) => {
              e.stopPropagation() // 클릭 이벤트 버블링 방지
              onClose?.()
            }}
            className="mt-3 text-sm text-blue-500 underline"
          >
            닫기
          </button>
        </>
      )}
    </div>
  )
}

export default MercenaryDetailCard
