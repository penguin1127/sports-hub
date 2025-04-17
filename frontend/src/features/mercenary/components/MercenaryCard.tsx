import { PostType } from "@/mock/mockRecruitPosts"

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
      <img src={post.thumbnail_url} alt={post.title} className="h-40 w-full object-cover" />
      <div className="p-4 space-y-1">
        <div className="text-sm text-gray-500">[개인 → 팀]</div>
        <h3 className="text-lg font-semibold truncate">{post.title}</h3>
        <p className="text-sm text-gray-600">{post.region} ・ {post.date} {post.time}</p>
      </div>
    </div>
  )
}

export default MercenaryCard
