// src/features/mypage/components/MyProfileForm.tsx
import { useEffect, useState } from "react";
import { fetchMyProfile, updateMyProfile } from "@/features/auth/api/userApi";
import { User } from "@/types/user";

export default function MyProfileForm() {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 🔄 사용자 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await fetchMyProfile();
        setUserData(profile);
      } catch (error) {
        console.error("프로필 정보를 불러오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✏️ 인풋 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!userData) return;
    setUserData({ ...userData, [name]: value });
  };

  // 💾 저장 버튼 클릭
  const handleSave = async () => {
    if (!userData) return;
    setIsSaving(true);
    try {
      await updateMyProfile(userData);
      alert("프로필이 저장되었습니다.");
    } catch (error) {
      console.error("프로필 저장 실패:", error);
      alert("저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (!userData) return <div>유저 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">기본 정보</h2>

      <div>
        <label className="block text-sm">이름</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm">이메일</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
      </div>

      {/* 🔧 추가 필드 (원하는 만큼 확장 가능) */}

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSaving ? "저장 중..." : "저장하기"}
      </button>
    </div>
  );
}
