// src/features/team-manage/components/TeamMemberList.tsx

import React, { useEffect, useState } from 'react';
import { getTeamMembersApi } from '@/features/team/api/teamApi';
import type { TeamMember } from '@/types/team';

interface Props {
  teamId: string;
}

const TeamMemberList: React.FC<Props> = ({ teamId }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const data = await getTeamMembersApi(teamId);
        setMembers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, [teamId]);

  if (isLoading) return <div className="p-6 text-center">팀원 목록을 불러오는 중...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">👥 팀원 관리</h2>
      <ul className="divide-y divide-gray-200">
        {members.map(member => (
          <li key={member.userId} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">{member.userName}</p>
              <p className="text-gray-500 text-sm">{member.userLoginId}</p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              member.roleInTeam === 'CAPTAIN' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {member.roleInTeam === 'CAPTAIN' ? '주장' : '팀원'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberList;