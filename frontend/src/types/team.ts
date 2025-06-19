// src/types/team.ts

// 팀의 전체 상세 정보를 위한 타입
export interface Team {
  id: number;
  name: string;
  captainId: number;
  captainName: string;
  region: string;
  subRegion: string | null;
  description: string | null;
  logoUrl: string | null;
  homeGround: string | null;
  createdAt: string;
  updatedAt: string;
  myRoleInTeam: 'CAPTAIN' | 'MEMBER' | null;
}

// 팀 목록 등에서 간단히 사용할 타입
export interface TeamSummary {
  id: number;
  name: string;
  logoUrl: string | null;
  region: string;
  roleInTeam: string;
}

// 팀원 정보를 위한 타입
export interface TeamMember {
  userId: number;
  userName: string;
  userLoginId: string;
  roleInTeam: string;
}

// 팀 공지사항을 위한 타입
export interface TeamAnnouncement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

// 팀 게시글을 위한 타입 (좋아요 정보 포함)
export interface TeamPost {
  id: number;
  title: string;
  content: string;
  authorName: string; 
  createdAt: string;
  likeCount: number;
  isLikedByCurrentUser: boolean;
}

// 댓글을 위한 타입
export interface PostComment {
  id: number;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: string;
}