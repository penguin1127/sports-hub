// src/types/user.ts

/**
 * 애플리케이션 내에서 사용될 사용자 정보 또는 서버에서 응답으로 받는 사용자 정보 타입.
 * 백엔드 User 엔티티의 필드명과 일치시킵니다.
 */
export interface User {
  id: number;
  name: string;        // User.java 필드
  email: string;       // User.java 필드
  userid: string;      // User.java 필드
  phoneNumber?: string; // User.java 필드 (phoneNumber)
  birthDate?: string;   // User.java 필드 (birthDate)
  region?: string;      // User.java 필드
  preferredPosition?: string; // User.java 필드
  isExPlayer?: boolean; // User.java 필드 (isExPlayer)
  role?: string;        // User.java 필드
  createdAt?: string;   // User.java 필드 (createdAt)
  updatedAt?: string;   // User.java 필드 (updatedAt)
  // User.java 엔티티에 없는 isCaptain, joinedTeams 등은 제거하거나 실제 엔티티/DTO에 맞게 추가
}

/**
 * 회원가입 요청 시 서버로 전송할 데이터의 구조를 정의하는 타입.
 * 백엔드의 UserSignUpRequestDto.java 와 필드 구조 및 타입이 일치해야 합니다.
 */
export interface UserSignUpRequestDto {
  name: string;
  email: string;
  userid: string; // UserSignUpRequestDto.java 필드와 일치
  password: string;
  isExPlayer?: boolean;
  region?: string;
  preferredPosition?: string;
  phoneNumber?: string;
}

/**
 * 로그인 요청 DTO.
 * 백엔드 로그인 DTO의 필드명과 일치해야 합니다. (백엔드 AuthController가 UserLoginRequestDto를 받고, 이 DTO에 userid가 있다고 가정)
 * 만약 백엔드 UserLoginRequestDto가 loginId를 사용한다면 loginId: string; 으로 변경해야 합니다.
 */
export interface UserLoginRequestDto {
  userid: string; // 백엔드 로그인 DTO가 userid를 사용한다고 가정
  password: string;
}

/**
 * 인증 응답 DTO.
 * 백엔드의 AuthLoginResponseDto.java 구조와 일치시킵니다.
 */
export interface AuthResponseDto {
  token: string;        // AuthLoginResponseDto.java의 필드명 'token'과 일치
  user: User;           // 로그인 후 반환되는 사용자 정보 (UserResponseDto 대신 User 타입 사용 가정)
                        // 백엔드가 UserResponseDto를 반환한다면, 해당 DTO 타입도 여기에 정의하고 사용
}