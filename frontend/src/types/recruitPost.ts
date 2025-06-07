// src/types/recruitPost.ts

export interface PostType { // API 응답 또는 화면 표시용 타입
  id: number;
  title: string;
  content: string;
  region: string;
  subRegion?: string;
  thumbnailUrl?: string; // PostType에는 있지만 CreationRequest에는 없을 수 있음, 또는 반대
  category: RecruitCategory; // Enum 값 사용
  targetType: RecruitTargetType; // Enum 값 사용
  fromParticipant: ParticipantType; // Enum 값 사용
  toParticipant: ParticipantType;   // Enum 값 사용
  gameDate?: string;
  gameTime?: string;
  status: RecruitStatus; // Enum 값 사용
  requiredPersonnel?: number;
  ageGroup?: string;
  preferredPositions?: string;
  matchRules?: string;
  minPlayers?: number;
  maxPlayers?: number;
  authorId: number | null;
  authorName: string | null;
  createdAt: string;
  updatedAt: string;
  // postingTeamId, postingTeamName 등 추가된 필드 고려
}

export enum RecruitCategory {
  MERCENARY = "MERCENARY",
  TEAM = "TEAM",
  MATCH = "MATCH",
}

export enum RecruitTargetType {
  USER = "USER",
  TEAM = "TEAM",
}

export enum ParticipantType {
  INDIVIDUAL = "INDIVIDUAL",
  TEAM = "TEAM",
}

export enum RecruitStatus {
  RECRUITING = "RECRUITING",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS", // 백엔드 Enum에 정의되어 있다면
  FINISHED = "FINISHED",       // 백엔드 Enum에 정의되어 있다면
  CANCELLED = "CANCELLED",     // 백엔드 Enum에 정의되어 있다면
}

/**
 * 게시글 생성 요청 시 서버로 전송할 데이터 타입.
 * 백엔드 RecruitPostCreationRequest.java 와 필드 구조 및 타입을 일치시킵니다.
 */
export interface RecruitPostCreationRequestDto {
  authorId: number; // User 엔티티의 id 타입과 일치
  title: string;
  content: string;
  category: RecruitCategory; // Enum 값 전송
  region: string;
  subRegion?: string;
  gameDate?: string; // YYYY-MM-DD 형식의 문자열
  gameTime?: string; // HH:MM 형식의 문자열
  matchRules?: string;
  minPlayers?: number; // Java Integer -> number | undefined
  maxPlayers?: number; // Java Integer -> number | undefined
  ageGroup?: string;
  preferredPositions?: string;
  thumbnailUrl?: string;
  // requiredPersonnel: String; // 백엔드 DTO가 String 이라면 String, Integer면 number
  // 이전 RecruitPostCreationRequest.java는 String requiredPersonnel 이었음.
  // 일관성을 위해 백엔드 DTO의 requiredPersonnel을 Integer로 변경하는 것을 권장.
  // 여기서는 백엔드 DTO가 Integer requiredPersonnel; 로 수정되었다고 가정.
  requiredPersonnel?: number;
  targetType: RecruitTargetType; // Enum 값 전송
  fromParticipant: ParticipantType; // Enum 값 전송
  toParticipant: ParticipantType;   // Enum 값 전송
  status: RecruitStatus; // Enum 값 전송 (생성 시 기본값은 보통 RECRUITING)
}