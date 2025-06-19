// src/features/team-manage/components/PostsSection.tsx

import React, { useEffect, useState } from 'react';
import { getTeamPostsApi } from '@/features/team/api/teamApi';
import type { TeamPost, Team } from '@/types/team';

interface Props {
  teamId: string;
  myRole: Team['myRoleInTeam'];
  onItemClick: (item: TeamPost) => void;
  onOpenCreateModal: () => void;
}

const PostsSection: React.FC<Props> = ({ teamId, myRole, onItemClick, onOpenCreateModal }) => {
  const [posts, setPosts] = useState<TeamPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getTeamPostsApi(teamId);
        setPosts(data);
      } catch (error) {
        console.error("게시글 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [teamId]);

  if (isLoading) return <div>게시글을 불러오는 중...</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">📝 팀 게시글</h2>
        {myRole && (
          <button onClick={onOpenCreateModal} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">
            글쓰기
          </button>
        )}
      </div>
      {posts.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {posts.map(item => (
            <li
              key={item.id}
              className="py-3 cursor-pointer hover:bg-gray-50"
              // ▼▼▼ 여기에 console.log를 추가합니다 ▼▼▼
              onClick={() => {
                console.log("1. PostsSection: 아이템 클릭됨!", item);
                onItemClick(item);
              }}
            >
              <p className="font-medium text-gray-800">{item.title}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 mt-1">
                  {/* ▼▼▼ 1. 작성자 이름이 안 나오는 문제 해결 ▼▼▼ */}
                  작성자: {item.authorName} {/* authorNickname -> authorName 으로 수정 */}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">등록된 게시글이 없습니다.</p>
      )}
    </div>
  );
};

export default PostsSection;