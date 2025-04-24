import { useNavigate } from "react-router-dom"
import { PostType } from "@/mock/mockRecruitPosts"

type CardProps = PostType

const getLabel = (category: string, targetType: string) => {
  if (category === "match") return "[경기 모집]"
  if (targetType === "team") return "[개인 → 팀]"
  if (targetType === "user") return "[팀 → 개인]"
  return ""
}

const SummaryCard = ({
  id,
  title,
  category,
  target_type,
  region,
  date,
  time,
  thumbnail_url,
}: CardProps) => {
  const navigate = useNavigate()
  const label = getLabel(category, target_type)

  const handleClick = () => {
    navigate(`/${category}?id=${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="border rounded-lg shadow hover:shadow-lg transition w-full max-w-sm bg-white overflow-hidden cursor-pointer"
    >
      <img src={thumbnail_url} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4 space-y-1">
        <div className="text-sm text-gray-500">{label}</div>
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600">{region} ・ {date} {time}</p>
      </div>
    </div>
  )
}

export default SummaryCard
