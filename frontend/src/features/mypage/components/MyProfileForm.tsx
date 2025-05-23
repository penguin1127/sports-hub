// src/features/mypage/components/MyProfileForm.tsx

import { useEffect, useState,useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { getMyProfile } from "@/features/auth/api/userApi";
import { User } from "@/types/user";

const MyProfileForm = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const { token } = useAuthStore();
   const fetchCount = useRef(0); // useRef로 호출 횟수 추적

  // ⛳ 내 정보 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("[MyProfileForm] fetchProfile 시작");
      try {
        console.log("/api/users/me 요청 보냄!");
        const data = await getMyProfile();
        setProfile(data);
        console.log("불러온 사용자 정보:", data);
      } catch (error) {
        console.error("프로필 불러오기 실패:", error);
      }
       console.log("[MyProfileForm] fetchProfile 끝");
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!profile) return <p>내 정보를 불러오는 중입니다...</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">내 정보</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            value={profile.name}
            disabled
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">아이디</label>
          <input
            type="text"
            value={profile.userid}
            disabled
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">지역</label>
          <input
            type="text"
            value={profile.region || ""}
            disabled
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">선호 포지션</label>
          <input
            type="text"
            value={profile.preferred_position || ""}
            disabled
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfileForm;
