// ✅ src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import HomePage from "@/features/home/pages/HomePage"
import MercenaryPage from "@/features/mercenary/pages/MercenaryPage"
import TeamManagePage from "@/features/team-manage/pages/TeamManagePage"
import TeamDetailPage from "@/features/team-manage/pages/TeamDetailPage"
import MyPage from "@/features/mypage/pages/MyPage" // ✅ 추가

const Team = () => <div className="text-xl">👥 Team Page</div>
const Match = () => <div className="text-xl">⚽ Match Page</div>
const NotFound = () => <div className="text-xl">404 | Page Not Found</div>

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mercenary" element={<MercenaryPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/match" element={<Match />} />
          <Route path="/team-manage" element={<TeamManagePage />} />
          <Route path="/team/:id" element={<TeamDetailPage />} />
          <Route path="/mypage" element={<MyPage />} /> {/* ✅ 마이페이지 경로 */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
