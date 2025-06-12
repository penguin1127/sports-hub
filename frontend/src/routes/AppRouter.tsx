import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import HomePage from "@/features/home/pages/HomePage";
import MercenaryPage from "@/features/mercenary/pages/MercenaryPage";
import TeamPage from "@/features/team/pages/TeamPage"; // 새로 만든 TeamPage 임포트
import MatchPage from "@/features/match/pages/MatchPage"; // 새로 만든 MatchPage 임포트
import TeamManagePage from "@/features/team-manage/pages/TeamManagePage";
import TeamDetailPage from "@/features/team-manage/pages/TeamDetailPage"; // 팀 상세 페이지 (만약 TeamPage와 역할이 다르다면)
import MyPage from "@/features/mypage/pages/MyPage";
import MyProfileEditPage from "@/features/mypage/pages/MyProfileEditPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import MyPageLayout from "@/features/mypage/pages/MyPageLayout"; // ◀ 새로 만든 레이아웃 임포트
import UserTeamsList from "@/features/mypage/components/UserTeamList";
 // ◀ 이전에 만든 컴포넌트 임포트

const NotFound = () => <div className="text-xl">404 | Page Not Found</div>;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mercenary" element={<MercenaryPage />} />
          <Route path="/team" element={<TeamPage />} /> {/* TeamPage로 교체 */}
          <Route path="/match" element={<MatchPage />} /> {/* MatchPage로 교체 */}
          <Route path="/team-manage" element={<TeamManagePage />} />
          {/* TeamDetailPage는 TeamPage와 역할이 겹치는지, 아니면 별도의 상세 정보 페이지인지 확인 필요 */}
          {/* 만약 TeamPage가 목록과 상세보기를 모두 처리한다면 /team/:id 경로는 불필요하거나 TeamPage로 연결 */}
          <Route path="/team/:id" element={<TeamDetailPage />} /> {/* 현재는 유지, 필요시 TeamPage로 변경 가능 */}
          

          
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
