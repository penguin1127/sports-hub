import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Layout from "@/components/layout/Layout"
import HomePage from "@/features/home/pages/HomePage"
import MercenaryPage from "@/features/mercenary/pages/MercenaryPage"
import TeamManagePage from "@/features/team-manage/pages/TeamManagePage"

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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter