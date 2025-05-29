// src/features/match/pages/MatchPage.tsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRecruitStore } from "@/stores/useRecruitStore";
import { PostType, RecruitCategory } from "@/types/recruitPost";
import MercenaryDetailCard from "@/features/mercenary/components/MercenaryDetailCard"; // 또는 MatchDetailCard
import NewPostModal from "@/features/mercenary/components/NewPostModal"; // 또는 NewMatchPostModal

const MatchPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const initialIdFromUrl = params.get("id");

  const user = useAuthStore((s) => s.user);
  const posts = useRecruitStore((s) => s.posts);
  const loadPosts = useRecruitStore((s) => s.loadPosts);
  const createPost = useRecruitStore((s) => s.createPost); // 경기 생성용 액션으로 변경 가능
  const removePost = useRecruitStore((s) => s.removePost); // 경기 삭제용 액션으로 변경 가능

  const [focusedId, setFocusedId] = useState<string | null>(initialIdFromUrl);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // MATCH 카테고리의 게시글을 로드
    loadPosts(RecruitCategory.MATCH);
  }, [loadPosts]);

  useEffect(() => {
    const currentIdFromParams = new URLSearchParams(search).get("id");
    setFocusedId(currentIdFromParams);
  }, [search]);

  const handleCreate = (post: PostType) => {
    createPost(post); // TODO: 서버 연동
    // navigate(`/match?id=${post.id}`, { replace: true });
  };

  const handleDelete = (postId: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      removePost(postId); // TODO: 서버 연동
      if (String(postId) === focusedId) {
        navigate("/match", { replace: true });
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
        <h1 className="text-3xl font-bold text-center flex-grow">🏟️ 경기 모집 목록</h1>
        {user && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ✏️ 경기 모집 글쓰기
          </button>
        )}
      </div>

      {isModalOpen && (
        <NewPostModal // 또는 NewMatchPostModal
          category={RecruitCategory.MATCH} // MATCH 카테고리 전달
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {posts.length === 0 && !focusedId && <p className="text-center text-gray-500">등록된 경기 모집글이 없습니다.</p>}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedPosts.map((post) => (
            <MercenaryDetailCard // 또는 MatchDetailCard
              key={post.id}
              post={post}
              isExpanded={String(post.id) === focusedId}
              onExpand={() => navigate(`/match?id=${post.id}`)} // URL 변경
              onClose={() => navigate("/match")} // URL 변경
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

export default MatchPage;