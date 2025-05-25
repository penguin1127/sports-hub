// src/features/home/pages/HomePage.tsx
import { useEffect } from "react"
import HomeSectionFilterWrapper from "@/features/home/components/HomeSectionFilterWrapper"
import { useRecruitStore } from "@/stores/useRecruitStore"
import { RecruitCategory } from "@/types/recruitPost" // RecruitCategory 임포트

export default function HomePage() {
  const posts = useRecruitStore((s) => s.posts)
  const loadPosts = useRecruitStore((s) => s.loadPosts) // 또는 loadAllHomepagePosts 등

  useEffect(() => {
    // 예시: loadPosts(RecruitCategory.MERCENARY) 또는 loadAllHomepagePosts() 등
    loadPosts(RecruitCategory.MERCENARY);
  }, [loadPosts])

  return (
    <div className="flex flex-col gap-12 max-w-screen-xl mx-auto px-4">
      {/* Hero 섹션 (이 부분이 배너일 수 있습니다) */}
      <section className="bg-slate-100 py-10 text-center">
        <h1 className="text-3xl font-bold">
          ⚽ 조기축구 인원 모집 플랫폼
        </h1>
        <p className="mt-2 text-slate-600">
          용병, 팀, 경기를 한눈에!
        </p>
      </section>

      {/* 용병 모집 */}
      <HomeSectionFilterWrapper
        title="🔥 용병 모집"
        category={RecruitCategory.MERCENARY}
        allPosts={posts}
      />

      <div className="border-t border-gray-200 mx-4" />

      {/* 팀 모집 */}
      <HomeSectionFilterWrapper
        title="🛡️ 팀 모집"
        category={RecruitCategory.TEAM}
        allPosts={posts} // TODO: 실제 팀 데이터를 로드하여 전달해야 함
      />

      <div className="border-t border-gray-200 mx-4" />

      {/* 경기 모집 */}
      <HomeSectionFilterWrapper
        title="🏟️ 경기 모집"
        category={RecruitCategory.MATCH}
        allPosts={posts} // TODO: 실제 경기 데이터를 로드하여 전달해야 함
      />
    </div>
  )
}