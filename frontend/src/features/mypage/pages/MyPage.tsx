// 📁 src/features/mypage/pages/MyPage.tsx

import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router-dom"

const MyPage = () => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/") // 홈으로 이동
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center">
        <p className="text-lg">로그인이 필요합니다.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>

      <div className="space-y-4 text-lg">
        <p><strong>이름:</strong> {user.name}</p>
        {/* 필요 시 이메일, 포지션 등 추가 */}
      </div>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default MyPage
