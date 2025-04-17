import HomeSectionFilterWrapper from "@/features/home/components/HomeSectionFilterWrapper"
import { mockRecruitPosts } from "@/mock/mockRecruitPosts"

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 max-w-screen-xl mx-auto px-4">
      <section className="bg-slate-100 py-10 text-center">
        <h1 className="text-3xl font-bold">⚽ 조기축구 인원 모집 플랫폼</h1>
        <p className="mt-2 text-slate-600">용병, 팀, 경기를 한눈에!</p>
      </section>

      <HomeSectionFilterWrapper title="🔥 용병 모집" category="mercenary" allPosts={mockRecruitPosts} />

  <div className="border-t border-gray-200 mx-4" />

  <HomeSectionFilterWrapper title="🛡️ 팀 모집" category="team" allPosts={mockRecruitPosts} />

  <div className="border-t border-gray-200 mx-4" />

  <HomeSectionFilterWrapper title="🏟️ 경기 모집" category="match" allPosts={mockRecruitPosts} />
    </div>
  )
}

export default HomePage
