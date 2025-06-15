// src/features/myPage/pages/MyPageLayout.tsx

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MyPageLayout: React.FC = () => {
  // NavLink의 active 상태에 따라 스타일을 다르게 주기 위한 함수
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = "block w-full text-left px-4 py-3 rounded-md transition-colors";
    return isActive
      ? `${baseClasses} bg-blue-500 text-white font-semibold`
      : `${baseClasses} hover:bg-gray-100`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">마이페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* ▼▼▼ 1. 왼쪽 사이드바 (네비게이션) ▼▼▼ */}
        <aside className="md:col-span-1">
          <nav className="space-y-2">
            <NavLink to="/mypage" end className={getNavLinkClass}>기본 정보</NavLink>
            <NavLink to="/mypage/teams" className={getNavLinkClass}>소속팀 목록</NavLink>
            <NavLink to="/mypage/posts" className={getNavLinkClass}>작성글 목록</NavLink>
            <NavLink to="/mypage/applications" className={getNavLinkClass}>신청 내역</NavLink>
            <NavLink to="/mypage/edit" className={getNavLinkClass}>정보 수정</NavLink>
          </nav>
        </aside>

        {/* ▼▼▼ 2. 오른쪽 컨텐츠 영역 ▼▼▼ */}
        {/* 이 부분은 URL 경로에 따라 다른 컴포넌트로 교체됩니다. */}
        <main className="md:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MyPageLayout;