import React from "react"

type CardProps = {
  title: string
  category: "mercenary" | "team" | "match"
  target_type: "user" | "team"
  region: string
  date: string
  time: string
  thumbnail_url: string
}

const getLabel = (category: string, targetType: string) => {
  if (category === "match") return "[경기 모집]"
  if (targetType === "team") return "[개인 → 팀]"
  if (targetType === "user") return "[팀 → 개인]"
  return ""
}

const SummaryCard: React.FC<CardProps> = ({ title, category, target_type, region, date, time, thumbnail_url }) => {
  const label = getLabel(category, target_type)

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition w-full bg-white overflow-hidden">
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
