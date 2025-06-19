// src/features/team-manage/components/TeamMemberList.tsx

import React, { useState, useEffect } from 'react';
import { getTeamMembersApi } from '@/features/team/api/teamApi';
import type { TeamMember, Team  } from '@/types/team';

interface Props {
  teamId: string;
  myRole: Team['myRoleInTeam'];

}

const TeamMemberList: React.FC<Props> = ({ teamId }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const data = await getTeamMembersApi(teamId);
        setMembers(data);
      } catch (error) {
        console.error(error);
        // 이 컴포넌트에서는 간단히 에러 메시지를 표시하지 않음 (부모에서 처리)
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, [teamId]);

  if (isLoading) {
    return <p className="text-gray-500">팀원 목록을 불러오는 중...</p>;
  }

  return (
    <div className="space-y-3">
      {members.map(member => (
        <div key={member.userId} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <p className="font-semibold">{member.userName}</p>
            <p className="text-sm text-gray-500">@{member.userLoginId}</p>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${member.roleInTeam === 'CAPTAIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            {member.roleInTeam}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TeamMemberList;