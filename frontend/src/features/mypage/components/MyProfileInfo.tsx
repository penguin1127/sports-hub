// src/features/myPage/components/MyProfileInfo.tsx

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { getMyProfileApi, updateMyProfileApi } from '@/features/auth/api/userApi';
import type { User, UserProfileUpdateDto } from '@/types/user';
import { REGIONS } from '@/constants/regions';

const MyProfileInfo: React.FC = () => {
  const { user, setUser } = useAuthStore();
  
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ▼▼▼ 1. 수정 모드를 제어할 상태와, 수정 중인 데이터를 담을 상태를 추가합니다. ▼▼▼
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfileUpdateDto>>({});

  const fetchMyProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyProfileApi();
      setProfile(data);
      // 수정 폼의 초기 데이터도 함께 설정
      setEditData({
        name: data.name,
        email: data.email,
        region: data.region,
        preferredPosition: data.preferredPosition,
        isExPlayer: data.isExPlayer,
        phoneNumber: data.phoneNumber,
      });
    } catch (err) {
      setError('프로필 정보를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    fetchMyProfile();
  }, [user]);

  // ▼▼▼ 2. 폼 입력값 변경을 처리하는 핸들러 함수 ▼▼▼
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // 체크박스의 경우 checked 속성을 사용합니다.
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setEditData(prev => ({ ...prev, [name]: inputValue }));
  };

  // ▼▼▼ 3. '저장' 버튼을 눌렀을 때 실행될 핸들러 함수 ▼▼▼
  const handleSave = async () => {
    if (!profile) return;

    try {
      const updatedProfile = await updateMyProfileApi(editData);
      setProfile(updatedProfile); // 화면에 보이는 프로필 정보 업데이트
      setUser(updatedProfile); // 헤더 등 다른 곳에 표시될 전역 상태도 업데이트
      setIsEditing(false); // 보기 모드로 전환
      alert('프로필이 성공적으로 수정되었습니다.');
    } catch (error) {
      alert('프로필 수정에 실패했습니다.');
      console.error(error);
    }
  };

  // '취소' 버튼 핸들러
  const handleCancel = () => {
    setEditData({ // 기존 프로필 정보로 되돌림
      name: profile?.name,
      email: profile?.email,
      region: profile?.region,
      preferredPosition: profile?.preferredPosition,
      isExPlayer: profile?.isExPlayer,
      phoneNumber: profile?.phoneNumber
    });
    setIsEditing(false);
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '미지정';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  if (isLoading) return <div className="text-center text-gray-500">정보를 불러오는 중...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!profile) return <div className="text-center text-gray-500">표시할 정보가 없습니다.</div>;

  return (
    <div className="space-y-8">
      {/* 기본 정보 */}
      <div>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-semibold">기본 정보</h3>
          {/* ▼▼▼ 4. isEditing 상태에 따라 다른 버튼을 보여줍니다. ▼▼▼ */}
          {isEditing ? (
            <div className="space-x-2">
              <button onClick={handleCancel} className="text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600">취소</button>
              <button onClick={handleSave} className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">저장</button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300">수정</button>
          )}
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div><dt className="font-medium text-gray-500">이름</dt><dd className="mt-1">{isEditing ? <input name="name" value={editData.name || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full"/> : profile.name}</dd></div>
          <div><dt className="font-medium text-gray-500">아이디</dt><dd className="mt-1 text-gray-500">{profile.userid} (수정 불가)</dd></div>
          <div><dt className="font-medium text-gray-500">이메일</dt><dd className="mt-1">{isEditing ? <input name="email" type="email" value={editData.email || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full"/> : profile.email}</dd></div>
          <div><dt className="font-medium text-gray-500">역할</dt><dd className="mt-1 text-gray-500">{profile.role} (수정 불가)</dd></div>
          <div><dt className="font-medium text-gray-500">전화번호</dt><dd className="mt-1">{isEditing ? <input name="phoneNumber" value={editData.phoneNumber || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full"/> : (profile.phoneNumber || '미입력')}</dd></div>
        </dl>
      </div>

      {/* 활동 정보 */}
      <div>
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">활동 정보</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div><dt className="font-medium text-gray-500">주 활동 지역</dt><dd className="mt-1">{isEditing ? 
            <select name="region" value={editData.region || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full">
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select> 
            : (profile.region || '미지정')}</dd></div>
          <div><dt className="font-medium text-gray-500">선호 포지션</dt><dd className="mt-1">{isEditing ? <input name="preferredPosition" value={editData.preferredPosition || ''} onChange={handleInputChange} className="border rounded px-2 py-1 w-full"/> : (profile.preferredPosition || '미지정')}</dd></div>
          <div><dt className="font-medium text-gray-500">선수 출신 여부</dt><dd className="mt-1 flex items-center">{isEditing ? <input name="isExPlayer" type="checkbox" checked={editData.isExPlayer || false} onChange={handleInputChange} className="h-4 w-4"/> : (profile.isExPlayer ? '예' : '아니오')}</dd></div>
        </dl>
      </div>
      
      {/* ... 계정 정보 (수정 불가) ... */}
      <div>
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">계정 정보</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div className="flex flex-col"><dt className="font-medium text-gray-500">가입일</dt><dd className="text-gray-800 mt-1">{formatDate(profile.createdAt)}</dd></div>
          <div className="flex flex-col"><dt className="font-medium text-gray-500">최근 정보 수정일</dt><dd className="text-gray-800 mt-1">{formatDate(profile.updatedAt)}</dd></div>
        </dl>
      </div>
    </div>
  );
};

export default MyProfileInfo;