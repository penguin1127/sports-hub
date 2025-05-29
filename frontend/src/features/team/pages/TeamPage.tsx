// src/features/team/pages/TeamPage.tsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRecruitStore } from "@/stores/useRecruitStore";
import { PostType, RecruitCategory } from "@/types/recruitPost";
import MercenaryDetailCard from "@/features/mercenary/components/MercenaryDetailCard"; // 또는 TeamDetailCard
import NewPostModal from "@/features/mercenary/components/NewPostModal"; // 또는 NewTeamPostModal

const TeamPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const initialIdFromUrl = params.get("id");

  const user = useAuthStore((s) => s.user);
  const posts = useRecruitStore((s) => s.posts);
  const loadPosts = useRecruitStore((s) => s.loadPosts);
  const createPost = useRecruitStore((s) => s.createPost); // 팀 생성용 액션으로 변경 가능
  const removePost = useRecruitStore((s) => s.removePost); // 팀 삭제용 액션으로 변경 가능

  const [focusedId, setFocusedId] = useState<string | null>(initialIdFromUrl);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // TEAM 카테고리의 게시글을 로드
    loadPosts(RecruitCategory.TEAM);
  }, [loadPosts]);

  useEffect(() => {
    const currentIdFromParams = new URLSearchParams(search).get("id");
    setFocusedId(currentIdFromParams);
  }, [search]);

  const handleCreate = (post: PostType) => {
    createPost(post); // TODO: 서버 연동
    // 예시: 생성 후 해당 글로 포커스 및 URL 변경 (replace: true 사용)
    // navigate(`/team?id=${post.id}`, { replace: true });
  };

  const handleDelete = (postId: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      removePost(postId); // TODO: 서버 연동
      if (String(postId) === focusedId) {
        navigate("/team", { replace: true });
      }
    }
  };

  const sortedPosts = focusedId
    ? [
        ...posts.filter((p) => String(p.id) === focusedId),
        ...posts.filter((p) => String(p.id) !== focusedId),
      ]
    : posts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24"> {/* 헤더 고려 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-grow">🛡️ 팀 모집 목록</h1>
        {user && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ✏️ 팀 모집 글쓰기
          </button>
        )}
      </div>

      {isModalOpen && (
        <NewPostModal // 또는 NewTeamPostModal
          category={RecruitCategory.TEAM} // TEAM 카테고리 전달
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {posts.length === 0 && !focusedId && <p className="text-center text-gray-500">등록된 팀 모집글이 없습니다.</p>}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedPosts.map((post) => (
            <MercenaryDetailCard // 또는 TeamDetailCard
              key={post.id}
              post={post}
              isExpanded={String(post.id) === focusedId}
              onExpand={() => navigate(`/team?id=${post.id}`)} // URL 변경
              onClose={() => navigate("/team")} // URL 변경
              onDelete={
                user && user.id && post.authorId && user.id === post.authorId
                  ? () => handleDelete(post.id)
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamPage;