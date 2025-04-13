import SummaryCard from "@/components/common/SummaryCard"
import { PostType } from "@/mock/mockRecruitPosts"

type Props = {
  title: string
  category: PostType["category"]
  posts: PostType[]
}

const HomeSectionSlider = ({ title, category, posts }: Props) => {
  return (
    <section className="w-full px-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <SummaryCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
}

export default HomeSectionSlider
