import { Link } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore";

const { token } = useAuthStore();// 로그인 상태 불러오기

const Header = () => {
  const { isLoggedIn, logout } = useAuth() // ⚠️ logout 함수도 가정

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="text-xl font-bold text-white">
          Sport-Hub
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className="flex gap-6 text-white font-medium">
          <Link to="/mercenary" className="hover:text-blue-400">용병</Link>
          <Link to="/team" className="hover:text-blue-400">팀</Link>
          <Link to="/match" className="hover:text-blue-400">경기</Link>
          {isLoggedIn && (
            <Link to="/team-manage" className="hover:text-blue-400">팀 관리</Link>
          )}
        </nav>

        {/* 우측 버튼 */}
        <div className="flex gap-3 items-center">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-sm border border-slate-300 rounded px-3 py-1 hover:bg-slate-100 text-white">
                로그인
              </Link>
              <Link to="/signup" className="text-sm border border-slate-300 rounded px-3 py-1 hover:bg-slate-100 text-white">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link to="/mypage" className="text-sm text-white hover:underline">
                마이페이지
              </Link>
              <button
                onClick={logout} // ✅ 로그아웃 동작
                className="text-sm text-white border border-white px-3 py-1 rounded hover:bg-red-500"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
