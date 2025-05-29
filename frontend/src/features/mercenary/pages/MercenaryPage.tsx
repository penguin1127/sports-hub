// src/features/mercenary/pages/MercenaryPage.tsx

import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRecruitStore } from "@/stores/useRecruitStore";
import { PostType, RecruitCategory } from "@/types/recruitPost";
import MercenaryDetailCard from "../components/MercenaryDetailCard";
import NewPostModal from "../components/NewPostModal"; // 실제 경로 확인
// 수정된 공용 컴포넌트 경로
import RegionSelectTrigger from "@/components/common/RegionSelectTrigger";
import RegionSelectModal from "@/components/common/RegionSelectModal";

const MercenaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const allPostsFromStore = useRecruitStore((s) => s.posts);
  const loadPosts = useRecruitStore((s) => s.loadPosts);
  const createPost = useRecruitStore((s) => s.createPost);
  const removePost = useRecruitStore((s) => s.removePost);

  const focusedId = useMemo(() => new URLSearchParams(location.search).get("id"), [location.search]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체 지역");
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await loadPosts(RecruitCategory.MERCENARY);
      } catch (error) {
        console.error("Error loading mercenary posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [loadPosts]);

  const filteredPosts = useMemo(() => {
    if (!allPostsFromStore) return [];
    return allPostsFromStore
      .filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(search.toLowerCase());
        const regionMatchInMain = p.region.toLowerCase().includes(search.toLowerCase());
        const subRegionMatch = p.subRegion ? p.subRegion.toLowerCase().includes(search.toLowerCase()) : false;
        return search === "" || titleMatch || regionMatchInMain || subRegionMatch;
      })
      .filter((p) => selectedRegion === "전체 지역" || p.region === selectedRegion || (p.subRegion && p.subRegion.includes(selectedRegion)));
  }, [allPostsFromStore, search, selectedRegion]);

  const handleCreate = (post: PostType) => {
    createPost(post);
    loadPosts(RecruitCategory.MERCENARY); // 목록 새로고침
    setModalOpen(false);
  };

  const handleDelete = async (postId: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await removePost(postId);
        if (String(postId) === focusedId) {
          navigate("/mercenary", { replace: true });
        }
        // 스토어에서 삭제 후 목록이 자동으로 업데이트된다면 아래 호출은 불필요
        // await loadPosts(RecruitCategory.MERCENARY);
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const sortedPosts = useMemo(() => {
    if (focusedId) {
      const focused = filteredPosts.find((p) => String(p.id) === focusedId);
      if (focused) {
        return [focused, ...filteredPosts.filter((p) => String(p.id) !== focusedId)];
      }
    }
    return filteredPosts;
  }, [filteredPosts, focusedId]);

  const handleExpand = (postId: string | number) => navigate(`/mercenary?id=${postId}`);
  const handleClose = () => navigate("/mercenary", { replace: true });

  if (isLoading && allPostsFromStore.length === 0) {
    return <div className="text-center py-20 pt-24">용병 목록을 불러오는 중입니다...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-center sm:text-left">🔥 용병 목록</h1>
        {user && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors w-full sm:w-auto"
          >
            ✏️ 용병 모집 글쓰기
          </button>
        )}
      </div>

      {isModalOpen && (
        <NewPostModal
          category={RecruitCategory.MERCENARY}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="제목 또는 지역으로 검색"
            className="border rounded px-3 py-2 w-full sm:w-auto sm:flex-grow text-sm"
          />
          <RegionSelectTrigger
            selected={selectedRegion}
            onClick={() => setIsRegionModalOpen(true)}
          />
          <button
            onClick={() => {
              setSearch("");
              setSelectedRegion("전체 지역");
            }}
            className="text-red-500 text-sm underline px-3 py-2 hover:bg-red-50 rounded"
          >
            초기화
          </button>
        </div>
      </div>

      {isRegionModalOpen && (
        <RegionSelectModal
          onSelect={(region) => {
            setSelectedRegion(region);
            setIsRegionModalOpen(false);
          }}
          onClose={() => setIsRegionModalOpen(false)}
        />
      )}
      
      {sortedPosts.length === 0 && !isLoading && (
        <p className="text-center text-gray-500 py-10">
          {search || selectedRegion !== "전체 지역" ? "검색 결과가 없습니다." : "등록된 용병 모집글이 없습니다."}
        </p>
      )}
      
      {sortedPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedPosts.map((post) => (
            <MercenaryDetailCard
              key={post.id}
              post={post}
              isExpanded={String(post.id) === focusedId}
              onExpand={() => handleExpand(post.id)}
              onClose={handleClose}
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

export default MercenaryPage;