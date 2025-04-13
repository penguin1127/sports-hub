import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import HomePage from "@/features/home/pages/HomePage"

const Mercenary = () => <div className="text-xl">🧑‍✈️ Mercenary Page</div>
const Team = () => <div className="text-xl">👥 Team Page</div>
const Match = () => <div className="text-xl">⚽ Match Page</div>
const NotFound = () => <div className="text-xl">404 | Page Not Found</div>

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mercenary" element={<Mercenary />} />
          <Route path="/team" element={<Team />} />
          <Route path="/match" element={<Match />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
