import { Outlet } from "react-router-dom"
import Header from "./Header" // 예시용
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
