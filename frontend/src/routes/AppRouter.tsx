import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import HomePage from "@/features/home/pages/HomePage"
import MercenaryPage from "../features/mercenary/pages/MercenaryPage"
// 필요 시 팀/매치 페이지도 나중에 추가 가능

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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
