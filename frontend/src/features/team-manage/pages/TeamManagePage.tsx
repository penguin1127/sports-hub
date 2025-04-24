// src/features/team-manage/pages/TeamManagePage.tsx
import { useNavigate } from "react-router-dom"

const dummyTeams = [
  { id: 1, name: "FC 강서", region: "서울 강서구" },
  { id: 2, name: "FC 마포", region: "서울 마포구" },
]

const TeamManagePage = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      <h2 className="text-xl font-bold">내 팀</h2>
      <p className="text-sm text-gray-600">내가 가입한 팀 목록과 팀 경기 일정을 표시합니다.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyTeams.map(team => (
          <div
            key={team.id}
            className="border rounded p-4 hover:shadow cursor-pointer"
            onClick={() => navigate(`/team-manage/${team.id}`)}
          >
            <h3 className="text-lg font-semibold">{team.name}</h3>
            <p className="text-sm text-gray-500">{team.region}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamManagePage
