// src/features/home/pages/HomePage.tsx
import { useEffect } from "react"
import HomeSectionFilterWrapper from "@/features/home/components/HomeSectionFilterWrapper"
import { useRecruitStore } from "@/stores/useRecruitStore"

export default function HomePage() {
  // Zustand 스토어에서 상태·액션만 꺼내 씁니다.
  const posts = useRecruitStore((s) => s.posts)
  const loadPosts = useRecruitStore((s) => s.loadPosts)

  // 마운트 시 한 번만 API 호출
  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  return (
    <div className="flex flex-col gap-12 max-w-screen-xl mx-auto px-4">
      {/* Hero 섹션 */}
      <section className="bg-slate-100 py-10 text-center">
        <h1 className="text-3xl font-bold">
          ⚽ 조기축구 인원 모집 플랫폼
        </h1>
        <p className="mt-2 text-slate-600">
          용병, 팀, 경기를 한눈에!
        </p>
      </section>

      {/* 용병 모집 (API 데이터) */}
      <HomeSectionFilterWrapper
        title="🔥 용병 모집"
        category="mercenary"
        allPosts={posts}
      />

      <div className="border-t border-gray-200 mx-4" />

      {/* 팀 모집 (추후 API 연동) */}
      <HomeSectionFilterWrapper
        title="🛡️ 팀 모집"
        category="team"
        allPosts={posts}
      />

      <div className="border-t border-gray-200 mx-4" />

      {/* 경기 모집 (추후 API 연동) */}
      <HomeSectionFilterWrapper
        title="🏟️ 경기 모집"
        category="match"
        allPosts={posts}
      />
    </div>
  )
}
