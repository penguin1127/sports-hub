import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#0f1625] py-5 text-white">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <span className="border-r pr-3 mr-3 text-white">Sport-Hub</span>
        </Link>

        {/* 중앙 메뉴 */}
        <nav className="flex gap-8 text-white text-base font-sans">
          <Link to="/mercenary" className="text-white hover:text-white">용병 목록</Link>
          <Link to="/team" className="text-white hover:text-white">팀 모집</Link>
          <Link to="/apply" className="text-white hover:text-white">개인 지원</Link>
          <Link to="/match" className="text-white hover:text-white">경기 모집</Link>
        </nav>

        {/* 오른쪽 버튼들 */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-1 rounded text-sm"
                onClick={() => alert("알림센터 클릭")}
              >
                알림센터
              </button>
              <Link
                to="/mypage"
                className="text-white hover:underline text-sm tracking-wide"
              >
                {user?.name}
              </Link>
              <button
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-1 rounded text-sm"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-1 rounded text-sm"
              >
                로그인
              </Link>
              <Link
                to="/register"
                className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-1 rounded text-sm"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
