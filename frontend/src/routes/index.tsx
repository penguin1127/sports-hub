// ✅ src/routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Header/Layout";
import Home from "@/features/home/Home";
import TeamPage from "@/features/team/TeamPage";
import MercenaryPage from "@/features/mercenary/MercenaryPage";
import MatchPage from "@/features/match/MatchPage";
import NotFound from "@/components/Error/NotFound";
import LoginPage from "@/features/auth/LoginPage";
import RegisterPage from "@/features/auth/RegisterPage";



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 상세 페이지 - 팀 모집 */}
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/team" element={<TeamPage />} />

          {/* 상세 페이지 - 용병 모집 */}
          <Route path="/mercenary" element={<MercenaryPage />} />
          <Route path="/mercenary/team" element={<MercenaryPage />} />

          {/* 상세 페이지 - 경기 모집 */}
          <Route path="/match" element=<MatchPage /> />

          <Route path="*" element={<NotFound />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
