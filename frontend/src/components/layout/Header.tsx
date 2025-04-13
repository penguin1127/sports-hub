import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-800 shadow-md">
      <div className="w-full px-4 flex items-center justify-between h-16 max-w-screen-xl mx-auto">
        <Link to="/" className="text-xl font-bold text-white">
          Sport-Hub
        </Link>

        <nav className="flex gap-6 text-white font-medium">
          <Link to="/mercenary" className="hover:text-blue-400">용병</Link>
          <Link to="/team" className="hover:text-blue-400">팀</Link>
          <Link to="/match" className="hover:text-blue-400">경기</Link>
        </nav>

        <div className="flex gap-2">
          <Link to="/login" className="text-sm border border-slate-300 rounded px-3 py-1 hover:bg-slate-100">
            로그인
          </Link>
          <Link to="/signup" className="text-sm border border-slate-300 rounded px-3 py-1 hover:bg-slate-100">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
