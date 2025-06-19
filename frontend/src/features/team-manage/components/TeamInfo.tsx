// src/features/team-manage/components/TeamInfo.tsx

import React, { useEffect, useState } from 'react';
import { getTeamDetailApi } from '@/features/team/api/teamApi';
import type { Team } from '@/types/team';

// 1. Props 인터페이스에 onRoleLoad 추가
interface Props {
  teamId: string;
  onRoleLoad: (role: Team['myRoleInTeam']) => void;
}

const TeamInfo: React.FC<Props> = ({ teamId, onRoleLoad }) => { // 2. onRoleLoad를 props로 받음
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getTeamDetailApi(teamId);
        setTeam(data);
        // 3. ★★★ 가장 중요한 부분 ★★★
        // 데이터를 성공적으로 불러온 후, 부모에게 역할을 알려줌
        onRoleLoad(data.myRoleInTeam);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeamDetail();
  }, [teamId, onRoleLoad]); // 4. useEffect 의존성 배열에 onRoleLoad 추가

  if (isLoading) return <div className="p-6 text-center">팀 정보를 불러오는 중...</div>;
  if (!team) return <div className="p-6 text-center">팀 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <img 
          src={team.logoUrl || '/images/default-team-logo.png'}
          alt={`${team.name} 로고`}
          className="w-32 h-32 rounded-full object-cover bg-gray-200 border-4 border-white shadow-lg"
        />
        <div className="flex-grow">
          <h1 className="text-4xl font-bold">{team.name}</h1>
          <p className="text-lg text-gray-500 mt-1">{team.region} {team.subRegion || ''}</p>
          <p className="text-md text-gray-700 mt-4">{team.description}</p>
        </div>
        {team.myRoleInTeam === 'CAPTAIN' && (
          <div>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-black">정보 수정</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamInfo;