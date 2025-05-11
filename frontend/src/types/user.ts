// src/types/user.ts

/**
 * User 타입은 마이페이지, 인증 등 전반적인 사용자 정보를 다룰 때 사용됩니다.
 */
export interface User {
  id: number;                     // 고유 식별자 (Primary Key)
  name: string;                   // 사용자 이름 (마이페이지에서 표시됨)
  email: string;                  // 이메일 (로그인 시 사용됨)
  userid: string;                 // 사용자 ID (중복 불가 식별자)
  password?: string;             // 비밀번호 (요청 시에는 제외되거나 마스킹됨)
  role: 'USER' | 'ADMIN';         // 사용자 권한 (기본값: USER)

  joinedTeams: string | null;     // 소속된 팀 목록 (JSON 문자열일 수 있음)
  isExPlayer: string | null;      // 선수 출신 여부 ('예', '아니오' 등)
  activityStartDate: string | null; // 활동 시작일 (예: '2024-01-01')
  activityEndDate: string | null;   // 활동 종료일 (미입력 시 null)

  region: string | null;           // 주요 활동 지역
  preferredPosition: string | null;// 선호 포지션 (FW, MF 등)
  isCaptain: boolean | null;       // 팀 주장 여부

  phoneNumber: string | null;      // 연락처
  birthDate: string | null;        // 생년월일

  height?: number | null;          // 신장 (선택)
  weight?: number | null;          // 체중 (선택)
  description?: string | null;     // 소개글
}
