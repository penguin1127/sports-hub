// src/stores/useAuthStore.ts
export const useAuth = () => {
    const isLoggedIn = true // 테스트용. 실제 로그인 상태 연결 예정
  
    const logout = () => {
      console.log("로그아웃 처리됨") // 실제론 localStorage 초기화 등
      window.location.href = "/" // 홈으로 리다이렉트 등
    }
  
    return { isLoggedIn, logout }
  }
  