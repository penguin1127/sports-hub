// src/routes/AppRouter.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import HomePage from "@/features/home/pages/HomePage";
import MercenaryPage from "@/features/mercenary/pages/MercenaryPage";
import TeamPage from "@/features/team/pages/TeamPage";
import MatchPage from "@/features/match/pages/MatchPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import TeamManagementPage from "@/features/team-manage/pages/TeamManagePage";
import MyPageLayout from "@/features/mypage/pages/MyPageLayout";
import MyProfileInfo from "@/features/mypage/components/MyProfileInfo";
import UserTeamList from "@/features/mypage/components/UserTeamList"; // UserTeamsList -> UserTeamList
import MyPost from "@/features/mypage/components/MyPost"; // MyPosts -> MyPost
import MySentApplications from "@/features/mypage/components/MySentApplications";

const TeamManagePage = () => <div className="p-8 pt-24">팀 관리 페이지</div>;
const TeamDetailPage = () => <div className="p-8 pt-24">팀 상세 페이지</div>;

const NotFound = () => <div className="text-xl p-8 pt-24">404 | Page Not Found</div>;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 헤더와 푸터가 있는 기본 레이아웃 */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mercenary" element={<MercenaryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/team/:id" element={<TeamDetailPage />} />
          <Route path="/team-manage" element={<TeamManagementPage />} />

          {/* 마이페이지 관련 중첩 라우트 */}
          <Route path="/mypage" element={<MyPageLayout />}>
            <Route index element={<MyProfileInfo />} />
            {/* ▼▼▼ 컴포넌트 이름을 실제 파일과 일치시킵니다. ▼▼▼ */}
            <Route path="teams" element={<UserTeamList />} />
            <Route path="posts" element={<MyPost />} />
            <Route path="applications" element={<MySentApplications />} />
            {/* <Route path="applications" element={<MyApplicationList />} />
              <Route path="edit" element={<MyProfileEditPage />} /> 
            */}
          </Route>
          
          <Route path="/team-manage" element={<TeamManagePage />} />

          {/* 일치하는 경로가 없을 때의 처리를 Layout 안으로 이동하여 일관성 유지 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 헤더와 푸터가 없는 독립적인 페이지들 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;