// src/features/team-manage/pages/TeamManagePage.tsx
import TeamListItem from "../components/TeamListItem"

const mockTeams = [
  {
    id: 1,
    name: "FC 강서",
    intro: "주말 리그 참가 중. 공격수 모집 중!",
    region: "서울 강서구",
    imageUrl: "/images/team1.jpg"
  },
  {
    id: 2,
    name: "마포 유나이티드",
    intro: "화요일 밤 정기 풋살! 수비수 환영",
    region: "서울 마포구",
    imageUrl: "/images/team2.jpg"
  }
]

const TeamManagePage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-2">
      <h2 className="text-xl font-bold mb-4">내 팀 목록</h2>
      <div className="border rounded divide-y">
        {mockTeams.map((team) => (
          <TeamListItem key={team.id} {...team} />
        ))}
      </div>
    </div>
  )
}

export default TeamManagePage
