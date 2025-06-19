// src/routes/AppRouter.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "@/components/layout/Layout";

// Main Pages
import HomePage from "@/features/home/pages/HomePage";
import MercenaryPage from "@/features/mercenary/pages/MercenaryPage";
import TeamPage from "@/features/team/pages/TeamPage";
import MatchPage from "@/features/match/pages/MatchPage";

// Auth Pages
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";

// Team & Team-Manage Pages
import TeamDetailPage from "@/features/team-manage/pages/TeamDetailPage"; // 팀 상세 정보 페이지
import TeamManagePage from "@/features/team-manage/pages/TeamManagePage";

// MyPage (Nested)
import MyPageLayout from "@/features/mypage/pages/MyPageLayout";
import MyProfileInfo from "@/features/mypage/components/MyProfileInfo";
import UserTeamList from "@/features/mypage/components/UserTeamList";
import MyPost from "@/features/mypage/components/MyPost";
import MyApplicationPage from "@/features/mypage/components/MyApplicationPage";

// Fallback Page
const NotFound = () => <div className="text-xl p-8 pt-24">404 | Page Not Found</div>;


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 헤더와 푸터가 있는 기본 레이아웃 */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          
          {/* 모집 관련 페이지 */}
          <Route path="/mercenary" element={<MercenaryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/match" element={<MatchPage />} />
          
          {/* 팀 상세 정보 페이지 (Public) */}
          <Route path="/team-manage/:id" element={<TeamDetailPage />} />

          {/* 팀 관리 페이지 (로그인 필요) */}
          <Route path="/team-manage" element={<TeamManagePage />} />
          {/* TODO: /team-manage/:teamId 경로에 팀 수정/관리 페이지 연결 */}

          {/* 마이페이지 (중첩 라우팅) */}
          <Route path="/mypage" element={<MyPageLayout />}>
            <Route index element={<MyProfileInfo />} />
            <Route path="teams" element={<UserTeamList />} />
            <Route path="posts" element={<MyPost />} />
            <Route path="applications" element={<MyApplicationPage />} />
          </Route>

          {/* 일치하는 경로가 없을 때 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 헤더와 푸터가 없는 독립 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;