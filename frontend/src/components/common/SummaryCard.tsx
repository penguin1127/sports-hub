// src/components/common/SummaryCard.tsx
import React from "react"
import { useNavigate } from "react-router-dom"
import { PostType } from "@/mock/mockRecruitPosts"

const getLabel = (category: string, targetType: string) => {
  if (category === "match") return "[경기 모집]"
  if (targetType === "team") return "[개인 → 팀]"
  if (targetType === "user") return "[팀 → 개인]"
  return ""
}

type Props = PostType

const SummaryCard: React.FC<Props> = ({
  id,
  title,
  category,
  target_type,
  region,
  date,
  time,
  thumbnail_url,
}) => {
  const navigate = useNavigate()
  const label = getLabel(category, target_type)

  return (
    <div
      className="border rounded-lg shadow hover:shadow-lg transition w-full max-w-sm bg-white overflow-hidden cursor-pointer"
      onClick={() => navigate(`/mercenary?id=${id}`)}
    >
      <img src={thumbnail_url} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4 space-y-1">
        <div className="text-sm text-gray-500">{label}</div>
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600">
          {region} · {date} {time}
        </p>
      </div>
    </div>
  )
}

export default SummaryCard
