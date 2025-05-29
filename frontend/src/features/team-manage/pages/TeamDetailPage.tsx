// ✅ features/team-manage/pages/TeamDetailPage.tsx (최종 반영: 댓글 UI 개선 및 좋아요 위치 변경)
import { useParams } from "react-router-dom"
import { useState } from "react"
import { mockTeamNotices, TeamNotice } from "@/mock/mockTeamNotices"
import { mockTeamBoards, TeamPost, CommentType } from "@/mock/mockTeamBoards"
import { mockUsers } from "@/mock/mockUsers"

const mockTeams = [
  {
    id: "1",
    name: "FC 강서",
    intro: "주말 리그 참가 중. 공격수 모집 중!",
    region: "서울 강서구",
    imageUrl: "/images/team1.jpg",
    captainId: "u1"
  },
  {
    id: "2",
    name: "마포 유나이티드",
    intro: "화/목 밤 풋살 정기전! 수비수 모집",
    region: "서울 마포구",
    imageUrl: "/images/team2.jpg",
    captainId: "u3"
  }
]

const getUserName = (id: string) => {
  const user = mockUsers.find((u) => u.id === id)
  return user ? user.name : "알 수 없음"
}

const TeamDetailPage = () => {
  const { id } = useParams()
  const [tagFilter, setTagFilter] = useState("전체")
  const [selectedPost, setSelectedPost] = useState<TeamPost | null>(null)
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({})
  const [replyContent, setReplyContent] = useState("")
  const [replyTarget, setReplyTarget] = useState<CommentType | null>(null)

  const team = mockTeams.find((t) => t.id === id)
  const notices = mockTeamNotices[id ?? ""] || []
  const boardPosts = mockTeamBoards[id ?? ""] || []

  const filteredPosts = tagFilter === "전체"
    ? boardPosts
    : boardPosts.filter(post => post.tag === tagFilter)

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleAddReply = () => {
    if (!replyTarget || !replyContent.trim()) return
    replyTarget.replies = [...(replyTarget.replies ?? []), {
      author: "나",
      content: replyContent,
      created_at: new Date().toISOString().slice(0, 10)
    }]
    setReplyContent("")
    setReplyTarget(null)
  }

  const renderComments = (comments: CommentType[]) => (
    <div className="border-t pt-2 space-y-2">
      {comments.map((c, i) => (
        <div key={i} className="border px-3 py-2 rounded text-sm">
          <div className="font-medium">{c.author}</div>
          <div>{c.content}</div>
          <div className="text-xs text-gray-400 mt-1">{c.created_at}</div>
          <button
            onClick={() => setReplyTarget(c)}
            className="text-xs text-blue-500 ml-2 hover:underline"
          >답글</button>

          {/* 대댓글 */}
          {c.replies && (
            <div className="ml-4 mt-2 space-y-1">
              {c.replies.map((r, j) => (
                <div key={j} className="border px-3 py-2 rounded bg-gray-50">
                  <div className="font-medium">{r.author}</div>
                  <div>{r.content}</div>
                  <div className="text-xs text-gray-400 mt-1">{r.created_at}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )

  if (!team) {
    return <div className="text-center py-10 text-gray-500">팀 정보를 찾을 수 없습니다.</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-6">
        <img src={team.imageUrl} alt={team.name} className="w-24 h-24 rounded-xl object-cover" />
        <div>
          <h1 className="text-2xl font-bold">{team.name}</h1>
          <p className="text-gray-600 mt-1">{team.intro}</p>
          <p className="text-sm text-gray-500">지역: {team.region}</p>
        </div>
      </div>

      <hr />

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">📢 팀 공지사항</h2>
        {notices.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {notices.map((notice: TeamNotice) => (
              <li key={notice.id}>
                <strong>{notice.title}</strong> - {notice.content}{" "}
                <span className="text-xs text-gray-400">({notice.created_at})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">등록된 공지사항이 없습니다.</p>
        )}
      </section>

      <hr />

      <section>
        <label htmlFor="tagFilter" className="mr-2 font-semibold text-sm">말머리 필터:</label>
        <select
          id="tagFilter"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="전체">전체</option>
          <option value="공지">📢 공지</option>
          <option value="자유">💬 자유</option>
          <option value="전술">⚽ 전술</option>
          <option value="질문">❓ 질문</option>
        </select>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">💬 팀 게시판</h2>
        {filteredPosts.length > 0 ? (
          <ul className="space-y-2">
            {filteredPosts.map((post: TeamPost) => (
              <li
                key={post.id}
                className="border rounded px-4 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="text-sm font-semibold">
                  <span className="inline-block mr-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs text-gray-700">
                    #{post.tag}
                  </span>
                  {post.title}
                </div>
                <div className="text-sm text-gray-500">
                  작성자: <strong>{getUserName(post.authorId)}</strong>
                  {post.authorId === team.captainId && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded">팀장</span>
                  )} {" | "}
                  {post.created_at}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  ❤️ {post.likes ?? 0} · 💬 댓글 {(post.comments ?? []).length}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">게시글이 없습니다.</p>
        )}
      </section>

      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{selectedPost.title}</h3>
              <button onClick={() => setSelectedPost(null)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              작성자: <strong>{getUserName(selectedPost.authorId)}</strong>
              {selectedPost.authorId === team.captainId && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded">팀장</span>
              )} {" | "}{selectedPost.created_at}
            </p>
            <p className="text-sm text-gray-800 mb-2">{selectedPost.content}</p>
            {selectedPost.image && (
              <img src={selectedPost.image} alt="post-img" className="w-full max-h-64 object-cover rounded mb-2" />
            )}
            <button
              onClick={() => toggleLike(selectedPost.id)}
              className="text-sm text-red-500 mb-2 flex items-center gap-1"
            >
              {likedPosts[selectedPost.id] ? "❤️" : "🤍"} <span>{selectedPost.likes ?? 0}</span>
            </button>

            <div className="text-sm mt-2 font-semibold">댓글</div>
            {renderComments(selectedPost.comments ?? [])}

            {replyTarget && (
              <div className="mt-2">
                <textarea
                  rows={2}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full border px-2 py-1 text-sm rounded"
                  placeholder={`'${replyTarget.author}'님에게 답글 달기...`}
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button onClick={() => setReplyTarget(null)} className="text-sm text-gray-500">취소</button>
                  <button
                    onClick={handleAddReply}
                    className="text-sm px-2 py-1 bg-blue-500 text-white rounded"
                  >답글 등록</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamDetailPage;
