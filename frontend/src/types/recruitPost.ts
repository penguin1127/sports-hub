// src/types/recruitPost.ts

/**
 * HomeSectionFilterWrapper, HomeSectionSlider, mock, API 모두 이 타입을 씁니다.
 */
// src/types/recruitPost.ts

export interface PostType {
  id: number
  title: string
  content: string
  region: string
  author: string

  // API/DB 에서 실제 오는 필드
  description:   string
  image:         string
  from:          string
  to:            string
  created_at:    string  // ISO 8601

  // 필터·섹션 구분용
  category:     "mercenary" | "team" | "match"
  target_type:  "user" | "team"

  // 슬라이더에서 쓰는 날짜·시간·상태·썸네일
  date:          string  // ex. "2025-04-20"
  time:          string  // ex. "07:00"
  status:        string
  thumbnail_url: string
}

