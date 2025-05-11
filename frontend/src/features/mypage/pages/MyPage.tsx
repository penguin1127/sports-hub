// src/features/mypage/pages/MyPage.tsx
import MyProfileForm from "../components/MyProfileForm";

export default function MyPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
      {/* 사이드 메뉴 */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">마이 페이지</h2>
        <nav className="flex flex-col space-y-2">
          <button className="text-left px-2 py-1 rounded bg-blue-100 text-blue-800">내 정보</button>
          <button className="text-left px-2 py-1 rounded hover:bg-gray-100">설정</button>
        </nav>
      </aside>

      {/* 본문 영역 */}
      <main className="flex-1 p-6">
        <MyProfileForm />
      </main>
    </div>
  );
}
