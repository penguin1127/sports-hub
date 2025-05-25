// src/features/mercenary/pages/MercenaryPage.tsx

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRecruitStore } from "@/stores/useRecruitStore";
import { PostType, RecruitCategory } from "@/types/recruitPost"; // RecruitCategory 임포트
import MercenaryDetailCard from "../components/MercenaryDetailCard";
import NewPostModal from "../components/NewPostModal";

const MercenaryPage = () => {
  const { search } = useLocation();
  // const navigate = useNavigate(); // 현재 코드에서 직접 사용되지 않음
  const params = new URLSearchParams(search);
  const initialId = params.get("id");

  const user = useAuthStore((s) => s.user);
  const posts = useRecruitStore((s) => s.posts);
  const loadPosts = useRecruitStore((s) => s.loadPosts);
  const createPost = useRecruitStore((s) => s.createPost);
  const removePost = useRecruitStore((s) => s.removePost);

  const [focusedId, setFocusedId] = useState<string | null>(initialId);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Mercenary 페이지이므로 RecruitCategory.MERCENARY 값을 전달합니다.
    // loadPosts 함수는 string 타입의 category를 기대하므로,
    // RecruitCategory.MERCENARY는 "MERCENARY" 문자열로 전달됩니다.
    loadPosts(RecruitCategory.MERCENARY);
  }, [loadPosts]); // loadPosts 함수가 변경될 때만 이 효과를 다시 실행합니다.

  useEffect(() => {
    setFocusedId(initialId);
  }, [initialId]);

  const handleCreate = (post: PostType) => {
    // TODO: 실제로는 서버에 생성 요청 후, 응답받은 게시글로 상태를 업데이트하거나 목록을 다시 로드해야 합니다.
    createPost(post);
  };

  const handleDelete = (postId: number | string) => { // PostType의 id가 number이므로 number로 받는 것이 더 타입 안전합니다.
    // TODO: 실제로는 서버에 삭제 요청 후, 성공 시 목록을 다시 로드하거나 상태에서 제거해야 합니다.
    if (window.confirm("정말 삭제하시겠습니까?")) {
      removePost(Number(postId)); // useRecruitStore의 removePost는 number 타입의 id를 기대합니다.
    }
  };

  const sortedPosts = focusedId
    ? [
        ...posts.filter((p) => String(p.id) === focusedId),
        ...posts.filter((p) => String(p.id) !== focusedId),
      ]
    : posts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 text-right">
        <button
          onClick={() => {
            if (!user) {
              alert("로그인이 필요합니다.");
              return;
            }
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          ✏️ 글 등록
        </button>
      </div>

      {isModalOpen && (
        <NewPostModal
          // NewPostModal의 Props.category 타입 정의에 따라 전달해야 합니다.
          // 1. Props.category가 RecruitCategory Enum 타입인 경우: RecruitCategory.MERCENARY
          // 2. Props.category가 "mercenary" | "team" | "match" (소문자)인 경우: "mercenary"
          // 3. Props.category가 "MERCENARY" | "TEAM" | "MATCH" (대문자, recruitPost.ts의 PostType.category와 동일)인 경우: RecruitCategory.MERCENARY
          // 현재 recruitPost.ts의 Enum과 PostType.category가 대문자이므로 아래와 같이 전달합니다.
          category={RecruitCategory.MERCENARY}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedPosts.map((post) => (
          <MercenaryDetailCard
            key={post.id}
            post={post}
            isExpanded={String(post.id) === focusedId}
            onExpand={() => setFocusedId(String(post.id))}
            onClose={() => setFocusedId(null)}
            onDelete={
              // PostType의 authorId (number | null) 와 user.id (number | undefined)를 비교합니다.
              user && user.id && post.authorId && user.id === post.authorId
                ? () => handleDelete(post.id)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MercenaryPage;