// src/features/mercenary/MercenaryPage.tsx
import { useState } from "react";
import MercenaryToggle from "./components/MercenaryToggle";
import MercenaryFilterGroupWrapper from "./components/MercenaryFilterGroupWrapper";
import MercenaryRecruitCard from "./components/MercenaryRecruitCard";
import MercenaryPersonalCard from "./components/MercenaryPersonalCard";
import { mercenaryList } from "@/mock/mockData";

const MercenaryPage = () => {
  const [isPersonal, setIsPersonal] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = mercenaryList.filter(
    (card) =>
      card.type === (isPersonal ? "mercenary" : "mercenary_team") &&
      (selectedRegion === "전체" || card.region === selectedRegion) &&
      card.title.includes(searchValue)
  );

  const sorted = selectedId
    ? [
        filtered.find((card) => card.id === selectedId)!,
        ...filtered.filter((card) => card.id !== selectedId),
      ]
    : filtered;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">용병 모집</h1>

      <MercenaryToggle isLeft={isPersonal} onToggle={() => setIsPersonal((prev) => !prev)} />

      <MercenaryFilterGroupWrapper
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
        {sorted.map((card) =>
          isPersonal ? (
            <MercenaryPersonalCard
              key={card.id}
              {...card}
              isExpanded={selectedId === card.id}
              onClick={() => setSelectedId(card.id)}
            />
          ) : (
            <MercenaryRecruitCard
              key={card.id}
              {...card}
              isExpanded={selectedId === card.id}
              onClick={() => setSelectedId(card.id)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MercenaryPage;
