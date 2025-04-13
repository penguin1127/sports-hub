import { useState } from "react"
import HomeSectionSlider from "./HomeSectionSlider"
import { PostType } from "@/mock/mockRecruitPosts"
import RegionSelectTrigger from "./RegionSelectTrigger"
import RegionSelectModal from "./RegionSelectModal"

type Props = {
  title: string
  category: PostType["category"]
  allPosts: PostType[]
}

const HomeSectionFilterWrapper = ({ title, category, allPosts }: Props) => {
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("전체 지역")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 🔍 필터 로직
  const filtered = allPosts
    .filter((p) => p.category === category)
    .filter((p) => {
      const inTitle = p.title.includes(search)
      const inRegion = p.region.includes(search)
      return search === "" || inTitle || inRegion
    })
    .filter((p) => region === "전체 지역" || p.region.includes(region))  // includes로 완화!

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-2">
        {/* 🔍 검색창 */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="제목 또는 지역 검색"
          className="border rounded px-3 py-1 w-48"
        />

        {/* 📍 지역 선택 버튼 */}
        <RegionSelectTrigger
          selected={region}
          onClick={() => setIsModalOpen(true)}
        />

        {/* ♻️ 초기화 버튼 */}
        <button
          onClick={() => {
            setSearch("")
            setRegion("전체 지역")
          }}
          className="text-red-500 text-sm underline"
        >
          초기화
        </button>
      </div>

      {/* 📌 지역 선택 모달 */}
      {isModalOpen && (
        <RegionSelectModal
          onSelect={(selectedRegion) => {
            setRegion(selectedRegion)
            setIsModalOpen(false)
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* 📦 카드 리스트 출력 */}
      <HomeSectionSlider
        title={title}
        category={category}
        posts={filtered}
      />
    </div>
  )
}

export default HomeSectionFilterWrapper
