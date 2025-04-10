// src/features/team/TeamPage.tsx

import { useEffect, useState } from "react";
import TeamToggle from "./components/TeamToggle";
import TeamFilterGroupWrapper from "./components/TeamFilterGroupWrapper";
import TeamRecruitCard from "./components/TeamRecruitCard";
import TeamApplyCard from "./components/TeamApplyCard";
import { useLocation } from "react-router-dom";
import { teamList } from "@/mock/mockData";

const TeamPage = () => {
  const location = useLocation();
  const [isPersonal, setIsPersonal] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // 🔹 URL 경로 기반으로 초기 토글 상태 결정
  useEffect(() => {
    setIsPersonal(!location.pathname.includes("/team/team"));
  }, [location.pathname]);

  const filtered = teamList.filter(
    (card) =>
      card.type === (isPersonal ? "team" : "team_team") &&
      (selectedRegion === "전체" || card.region === selectedRegion) &&
      card.title.includes(searchValue)
  );

  // 🔹 선택된 카드 맨 위로
  const sortedCards = selectedCardId
    ? [
        filtered.find((c) => c.id === selectedCardId)!,
        ...filtered.filter((c) => c.id !== selectedCardId),
      ]
    : filtered;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">팀 모집</h1>

      <TeamToggle isLeft={isPersonal} onToggle={() => setIsPersonal((prev) => !prev)} />

      <TeamFilterGroupWrapper
        searchValue={searchValue}
        selectedRegion={selectedRegion}
        onSearchChange={setSearchValue}
        onRegionChange={setSelectedRegion}
        onReset={() => {
          setSearchValue("");
          setSelectedRegion("전체");
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {sortedCards.map((card) =>
          isPersonal ? (
            <TeamRecruitCard
              key={card.id}
              data={card}
              isSelected={selectedCardId === card.id}
              onClick={() => setSelectedCardId(card.id)}
            />
          ) : (
            <TeamApplyCard
              key={card.id}
              data={card}
              isSelected={selectedCardId === card.id}
              onClick={() => setSelectedCardId(card.id)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TeamPage;
