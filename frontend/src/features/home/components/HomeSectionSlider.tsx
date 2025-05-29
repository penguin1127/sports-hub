import { useRef } from "react"
import { useNavigate } from "react-router-dom"
//import { PostType } from "@/mock/mockRecruitPosts"
import type { PostType } from "@/types/recruitPost"
import SummaryCard from "@/components/common/SummaryCard"

type Props = {
  title: string
  category: PostType["category"]
  posts: PostType[]
}

const HomeSectionSlider = ({ title, category, posts }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
    }
  }

  return (
    <section className="px-4 space-y-4">
      {/* 섹션 제목 */}
      <div className="flex justify-between items-center">
        <h2
          className="text-2xl font-bold cursor-pointer hover:underline"
          onClick={() => navigate(`/${category}`)}
        >
          {title}
        </h2>
      </div>

      {/* 카드 슬라이더 + 버튼 겹치기 */}
      <div className="relative">
        {/* 왼쪽 버튼 */}
        <button
          onClick={() => scroll(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow px-2 py-1"
        >
          ←
        </button>

        {/* 카드 리스트 */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-8"
        >
          {posts.map((post) => (
            <div key={post.id} className="shrink-0 w-64 snap-start">
              <SummaryCard {...post} />
            </div>
          ))}
        </div>

        {/* 오른쪽 버튼 */}
        <button
          onClick={() => scroll(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow px-2 py-1"
        >
          →
        </button>
      </div>
    </section>
  )
}

export default HomeSectionSlider
