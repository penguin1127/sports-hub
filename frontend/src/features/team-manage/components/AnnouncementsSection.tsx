// src/features/team-manage/components/AnnouncementsSection.tsx

import React, { useEffect, useState } from 'react';
import { getTeamAnnouncementsApi } from '@/features/team/api/teamApi';
import type { TeamAnnouncement, Team  } from '@/types/team';

interface Props {
  teamId: string;
  myRole: Team['myRoleInTeam']; 
  onItemClick: (item: TeamAnnouncement) => void;
  onOpenCreateModal: () => void; // 모달 열기 함수 prop 추가
}

const AnnouncementsSection: React.FC<Props> = ({ teamId, myRole, onItemClick, onOpenCreateModal  }) => {
  const [announcements, setAnnouncements] = useState<TeamAnnouncement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const data = await getTeamAnnouncementsApi(teamId);
        setAnnouncements(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  }, [teamId]);

  if (isLoading) return <div>공지사항을 불러오는 중...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">📢 공지사항</h2>
        {/* 주장이면 작성 버튼 표시 */}
        {myRole === 'CAPTAIN' && (
          <button onClick={onOpenCreateModal} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
            공지 작성
          </button>
        )}
      </div>
      {announcements.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {announcements.map(item => (
            // TODO: 클릭 시 모달을 띄우는 로직 추가
            <li 
              key={item.id} 
              className="py-3 cursor-pointer hover:bg-gray-50"
              onClick={() => onItemClick(item)} // 클릭 시 콜백 함수 호출
            >
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
      )}
    </div>
  );
};

export default AnnouncementsSection;