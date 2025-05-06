import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import HomePage from "@/features/home/pages/HomePage";
import MercenaryPage from "@/features/mercenary/pages/MercenaryPage";
import TeamManagePage from "@/features/team-manage/pages/TeamManagePage";
import TeamDetailPage from "@/features/team-manage/pages/TeamDetailPage";
import MyPage from "@/features/mypage/pages/MyPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";

const Team = () => <div className="text-xl">👥 Team Page</div>;
const Match = () => <div className="text-xl">⚽ Match Page</div>;
const NotFound = () => <div className="text-xl">404 | Page Not Found</div>;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 레이아웃이 적용되는 페이지 */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mercenary" element={<MercenaryPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/match" element={<Match />} />
          <Route path="/team-manage" element={<TeamManagePage />} />
          <Route path="/team/:id" element={<TeamDetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        {/* 로그인/회원가입 페이지는 Layout 없이 단독 렌더링 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 404 처리 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
