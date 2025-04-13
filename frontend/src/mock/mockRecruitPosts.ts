export type PostType = {
  id: number
  category: "mercenary" | "team" | "match"
  target_type: "user" | "team"
  title: string
  region: string
  date: string
  time: string
  status: string
  thumbnail_url: string
  description: string
  created_at: string
}

// ❗ 타입을 명시해줘야 타입 추론 오류가 안 남!
export const mockRecruitPosts: PostType[] = [
  {
    id: 1,
    category: "mercenary",
    target_type: "team",
    title: "주말에 함께할 팀 찾습니다!",
    region: "서울 강서구",
    date: "2025-04-20",
    time: "07:00",
    status: "open",
    thumbnail_url: "/images/user1.jpg",
    description: "경험 많은 FW입니다. 일요일 새벽 경기 선호합니다.",
    created_at: "2025-04-17T08:00:00Z"
  },
  {
    id: 2,
    category: "team",
    target_type: "user",
    title: "마포FC에서 팀원 모집합니다",
    region: "서울 마포구",
    date: "2025-04-21",
    time: "09:00",
    status: "open",
    thumbnail_url: "/images/team1.jpg",
    description: "수비 가능한 분 환영합니다. 즐겁게 운동해요!",
    created_at: "2025-04-17T09:15:00Z"
  },
  {
    id: 3,
    category: "match",
    target_type: "team",
    title: "일요일 오후 팀 매칭 원해요",
    region: "경기 고양시",
    date: "2025-04-27",
    time: "15:00",
    status: "open",
    thumbnail_url: "/images/match1.jpg",
    description: "중급 팀과 친선 경기 원합니다. 풋살 가능.",
    created_at: "2025-04-16T14:00:00Z"
  }
]
