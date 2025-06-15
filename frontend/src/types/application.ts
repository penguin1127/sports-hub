// src/types/application.ts
import { ApplicationStatus } from "./recruitPost"; // RecruitStatus와 동일한 Enum을 쓴다고 가정

// 백엔드의 ApplicationResponseDto와 일치하는 타입
export interface MyApplication {
  applicationId: number;
  status: ApplicationStatus;
  message: string;
  rejectionReason: string | null;
  appliedAt: string;
  postId: number;
  postTitle: string;
}

export interface ApplicationRequestDto {
  message?: string;
  applicantTeamId?: number;
}