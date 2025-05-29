// src/components/layout/Layout.tsx (또는 실제 경로)
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      {/* 헤더의 높이만큼 main 요소에 상단 패딩을 추가합니다. */}
      {/* 예: 헤더 높이가 약 68px (17 * 4px)이면 pt-17 또는 그보다 약간 큰 값 */}
      {/* Tailwind CSS 기본 유틸리티에는 pt-17이 없을 수 있으므로, 근사치 또는 커스텀 값 사용 */}
      {/* 여기서는 일반적인 헤더 높이를 고려하여 pt-16 (64px) 또는 pt-20 (80px)을 사용해볼 수 있습니다. */}
      {/* 정확한 값은 실제 렌더링된 헤더 높이를 측정하고 결정하세요. */}
      <main className="w-full pt-[68px]"> {/* 예시: 인라인 스타일 또는 JIT 모드 사용 */}
      {/* 또는 Tailwind CSS 유틸리티 사용: <main className="w-full pt-16 sm:pt-20"> (sm 이상에서 더 큰 패딩) */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;