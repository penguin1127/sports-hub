// src/features/team/api/teamApi.ts

import axiosInstance from "@/lib/axiosInstance";
import type { Team, TeamMember, TeamAnnouncement, TeamPost, PostComment } from "@/types/team"; // Team 전체 타입을 정의했다고 가정

// 팀 생성 시 보낼 데이터 타입
export interface TeamCreateRequestDto {
  name: string;
  region: string;
  subRegion?: string;
  description?: string;
  logoUrl?: string;
  homeGround?: string;
}

interface PostData {
  title: string;
  content: string;
}

// 댓글 작성 요청 데이터
interface CommentData {
  content: string;
}

/**
 * 새로운 팀 생성 API
 * @param teamData 생성할 팀의 정보
 */
export const createTeamApi = async (teamData: TeamCreateRequestDto): Promise<Team> => {
  try {
    const response = await axiosInstance.post<Team>('/api/teams', teamData);
    return response.data;
  } catch (error: unknown) {
    // ▼▼▼ 버전에 상관없이 동작하는 안전한 에러 처리 로직 ▼▼▼
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || '팀 생성 중 오류가 발생했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

/**
 * 특정 팀의 상세 정보 조회 API
 * @param teamId 조회할 팀의 ID
 */
export const getTeamDetailApi = async (teamId: string): Promise<Team> => {
  const response = await axiosInstance.get<Team>(`/api/teams/${teamId}`);
  return response.data;
};

/**
 * 특정 팀의 팀원 목록 조회 API
 * @param teamId 조회할 팀의 ID
 */
export const getTeamMembersApi = async (teamId: string): Promise<TeamMember[]> => {
  try {
    const response = await axiosInstance.get<TeamMember[]>(`/api/teams/${teamId}/members`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team members for team ID ${teamId}:`, error);
    throw new Error('팀원 목록을 불러오는 데 실패했습니다.');
  }
};

/**
 * 특정 팀의 공지사항 목록 조회 API
 * @param teamId 조회할 팀의 ID
 */
export const getTeamAnnouncementsApi = async (teamId: string): Promise<TeamAnnouncement[]> => {
  try {
    const response = await axiosInstance.get<TeamAnnouncement[]>(`/api/teams/${teamId}/announcements`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team announcements for team ID ${teamId}:`, error);
    throw new Error('팀 공지사항을 불러오는 데 실패했습니다.');
  }
};

/**
 * 특정 팀의 게시글 목록 조회 API
 * (백엔드에 GET /api/teams/{teamId}/posts API가 필요합니다. 우선 임시로 경로를 가정합니다.)
 * @param teamId 조회할 팀의 ID
 */
export const getTeamPostsApi = async (teamId: string): Promise<TeamPost[]> => {
  try {
    // TODO: 백엔드에 이 API를 만들어야 합니다. 지금은 RecruitPost를 반환한다고 가정합니다.
    const response = await axiosInstance.get<TeamPost[]>(`/api/teams/${teamId}/posts`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team posts for team ID ${teamId}:`, error);
    throw new Error('팀 게시글을 불러오는 데 실패했습니다.');
  }
};

// 공지사항 생성 API 함수
export const createAnnouncementApi = async (teamId: string, data: PostData) => {
  const response = await axiosInstance.post(`/api/teams/${teamId}/announcements`, data);
  return response.data;
};

// 게시글 생성 API 함수
export const createPostApi = async (teamId: string, data: PostData) => {
  const response = await axiosInstance.post(`/api/teams/${teamId}/posts`, data);
  return response.data;
};

// 게시글 좋아요 토글 API
export const toggleLikeApi = async (postId: number): Promise<{ isLiked: boolean }> => {
  try {
    const response = await axiosInstance.post<{ isLiked: boolean }>(`/api/posts/${postId}/like`);
    return response.data;
  } catch (error) { // error의 타입은 'unknown'
    console.error(`Error toggling like for post ID ${postId}:`, error);

    // ▼▼▼ isAxiosError를 사용하지 않는 최종 버전 ▼▼▼

    // 1. error가 존재하고, 객체이며, 'response'라는 속성을 가지고 있는지 확인합니다.
    if (error && typeof error === 'object' && 'response' in error && error.response) {
      // 2. 이 조건을 통과하면 Axios 에러로 간주하고 안전하게 사용합니다.
      //    TypeScript가 타입을 더 잘 이해하도록 타입을 명시해줍니다.
      const axiosError = error as { response: { data?: { message?: string } } };
      
      const message = axiosError.response.data?.message || '좋아요 처리에 실패했습니다.';
      throw new Error(message);
    }
    
    // Axios 에러가 아닌 다른 종류의 에러 처리
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

// 게시글 상세 정보 조회 API (좋아요 정보를 포함하도록 수정)
export const getPostDetailApi = async (postId: number): Promise<TeamPost> => { // 반환 타입을 TeamPost로 가정
    const response = await axiosInstance.get<TeamPost>(`/api/posts/${postId}`);
    return response.data;
}

// 특정 게시글의 댓글 목록 조회 API
export const getCommentsApi = async (postId: number): Promise<PostComment[]> => {
  const response = await axiosInstance.get<PostComment[]>(`/api/posts/${postId}/comments`);
  return response.data;
};

// 댓글 작성 데이터 타입
interface CommentData {
  content: string;
}

// 특정 게시글에 댓글 작성 API
export const createCommentApi = async (postId: number, data: CommentData): Promise<PostComment> => {
  const response = await axiosInstance.post<PostComment>(`/api/posts/${postId}/comments`, data);
  return response.data;
};
