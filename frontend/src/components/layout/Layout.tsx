import { Outlet } from "react-router-dom"
import Header from "./Header" // 예시용

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
