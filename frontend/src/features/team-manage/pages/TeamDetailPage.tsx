// src/features/team-manage/pages/TeamDetailPage.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// 컴포넌트 import
import TeamInfo from '../components/TeamInfo';
import AnnouncementsSection from '../components/AnnouncementsSection';
import PostsSection from '../components/PostsSection';
import TeamMemberList from '../components/TeamMemberList';
import DetailModal from '@/components/common/DetailModal';
import CreationModal from '@/components/common/CreationModal';

// API 및 타입 import
import { createAnnouncementApi, createPostApi } from '@/features/team/api/teamApi';
import type { Team, TeamAnnouncement, TeamPost, PostComment as CommentType } from '@/types/team';

const TeamDetailPage: React.FC = () => {
  const { id: teamId } = useParams<{ id: string }>();

  // 뷰 전환 상태
  const [isMemberViewActive, setIsMemberViewActive] = useState(false);
  
  // 현재 사용자 역할 상태
  const [myRole, setMyRole] = useState<Team['myRoleInTeam']>(null);
  
  // 상세 보기 모달을 위한 상태 (postId만 저장)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // 작성 모달 상태
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [creationModalType, setCreationModalType] = useState<'announcement' | 'post'>('announcement');

  // 상세 모달 열기/닫기 핸들러
  const handleItemClick = (item: TeamAnnouncement | TeamPost) => {
    setSelectedPostId(item.id);
  };
  const handleCloseDetailModal = () => {
    setSelectedPostId(null);
  };

  // 작성 모달 열기/닫기 핸들러
  const handleOpenCreationModal = (type: 'announcement' | 'post') => {
    setCreationModalType(type);
    setIsCreationModalOpen(true);
  };
  const handleCloseCreationModal = () => {
    setIsCreationModalOpen(false);
  };

  // 작성 제출 핸들러 (API 호출 및 새로고침)
  const handleCreationSubmit = async (data: { title: string; content: string }) => {
    if (!teamId) return;
    
    if (creationModalType === 'announcement') {
      await createAnnouncementApi(teamId, data);
      alert("공지사항이 등록되었습니다.");
    } else {
      await createPostApi(teamId, data);
      alert("게시글이 등록되었습니다.");
    }
    window.location.reload(); 
  };
  
  if (!teamId) {
    return <div className="max-w-4xl mx-auto px-4 py-8 pt-24 text-center text-red-500">잘못된 접근입니다.</div>;
  }
  
  const getTabClass = (isActive: boolean) => {
    return `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
    }`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-24 space-y-8">
      <div className="bg-white p-2 rounded-lg shadow-md">
        <nav className="flex space-x-2">
          <button onClick={() => setIsMemberViewActive(false)} className={getTabClass(!isMemberViewActive)}>
            팀 정보/소식
          </button>
          <button onClick={() => setIsMemberViewActive(true)} className={getTabClass(isMemberViewActive)}>
            팀원 관리
          </button>
        </nav>
      </div>

      {isMemberViewActive ? (
        <TeamMemberList teamId={teamId} myRole={myRole} />
      ) : (
        <div className="space-y-8">
          <TeamInfo teamId={teamId} onRoleLoad={setMyRole} />
          <AnnouncementsSection 
            teamId={teamId} 
            myRole={myRole}
            onItemClick={handleItemClick}
            onOpenCreateModal={() => handleOpenCreationModal('announcement')}
          />
          <PostsSection 
            teamId={teamId} 
            myRole={myRole}
            onItemClick={handleItemClick}
            onOpenCreateModal={() => handleOpenCreationModal('post')}
          />
        </div>
      )}

      {/* 상세 보기 모달 */}
      <DetailModal
        isOpen={selectedPostId !== null}
        onClose={handleCloseDetailModal}
        postId={selectedPostId}
      />

      {/* 작성 모달 */}
      <CreationModal 
        isOpen={isCreationModalOpen}
        onClose={handleCloseCreationModal}
        onSubmit={handleCreationSubmit}
        title={creationModalType === 'announcement' ? '공지사항 작성' : '게시글 작성'}
      />
    </div>
  );
};

// 파일 이름에 맞춰 export 이름을 수정해주세요.
// export default TeamManageDetailPage; -> export default TeamDetailPage;
export default TeamDetailPage;