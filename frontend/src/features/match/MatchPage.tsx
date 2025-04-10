import { useState } from "react";
import MatchFilterGroupWrapper from "./components/MatchFilterGroupWrapper";
import MatchCard from "./components/MatchCard";
import { matchList } from "@/mock/mockData";

const MatchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = matchList.filter(
    (card) =>
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
      <h1 className="text-2xl font-bold mb-6">경기 모집</h1>

      <MatchFilterGroupWrapper
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
        {sorted.map((card) => (
          <MatchCard
            key={card.id}
            {...card}
            isExpanded={selectedId === card.id}
            onClick={() => setSelectedId(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchPage;
