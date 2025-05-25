// src/types/recruitPost.ts

export interface PostType {
  id: number;
  title: string;
  content: string;
  region: string;
  subRegion?: string; // 백엔드 DTO에 있다면 추가 (nullable 가능)
  thumbnailUrl: string;
  category: "MERCENARY" | "TEAM" | "MATCH"; // 백엔드 Enum에 맞게 대문자로 (필요시)
  targetType: "USER" | "TEAM"; // 백엔드 Enum에 맞게 대문자로 (필요시)

  fromParticipant: string; // 백엔드 ParticipantType Enum (string)
  toParticipant: string; // 백엔드 ParticipantType Enum (string)
  gameDate?: string;
  gameTime: string;
  status: string; // 백엔드 RecruitStatus Enum (string)

  requiredPersonnel: number; // **이것이 number 타입임을 명확히 합니다.**
  ageGroup: string;
  preferredPositions: string;
  matchRules: string;
  minPlayers: number;
  maxPlayers: number;

  authorId: number | null;
  authorName: string | null;

  createdAt: string;
  updatedAt: string;
}

// Enum 정의 (NewPostModal에서 사용)
export enum RecruitCategory {
  MERCENARY = "MERCENARY",
  TEAM = "TEAM",
  MATCH = "MATCH",
}

export enum RecruitTargetType {
  USER = "USER", // 개인
  TEAM = "TEAM", // 팀
}

export enum ParticipantType { // fromParticipant, toParticipant 용
  INDIVIDUAL = "INDIVIDUAL", // 개인
  TEAM = "TEAM",             // 팀
}

export enum RecruitStatus {
  RECRUITING = "RECRUITING",     // 모집중
  COMPLETED = "COMPLETED",       // 모집완료
  IN_PROGRESS = "IN_PROGRESS",   // 경기중
  FINISHED = "FINISHED",         // 경기종료
  CANCELLED = "CANCELLED",       // 취소됨
}