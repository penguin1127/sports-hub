import { useState } from "react";
import {
  mercenaryList,
  teamList,
  matchList,
} from "@/mock/mockData";
import SummaryCard from "@/components/Card/SummaryCard";
import HeroBanner from "@/components/Layout/HeroBanner";
import CardSliderContainer from "@/components/Layout/CardSliderContainer";
import SectionWithToggle from "@/components/Common/SectionWithToggle";
import MercenaryFilterGroupWrapper from "@/features/mercenary/components/MercenaryFilterGroupWrapper";
import TeamFilterGroupWrapper from "@/features/team/components/TeamFilterGroupWrapper";
import MatchFilterGroupWrapper from "@/features/match/components/MatchFilterGroupWrapper";

const Home = () => {
  const [isMercenaryPersonal, setIsMercenaryPersonal] = useState(true);
  const [isTeamRecruitPersonal, setIsTeamRecruitPersonal] = useState(true);

  // 필터 상태들
  const [mercenarySearch, setMercenarySearch] = useState("");
  const [mercenaryRegion, setMercenaryRegion] = useState("전체");

  const [teamSearch, setTeamSearch] = useState("");
  const [teamRegion, setTeamRegion] = useState("전체");

  const [matchSearch, setMatchSearch] = useState("");
  const [matchRegion, setMatchRegion] = useState("전체");

  // 필터링된 목록
  const filteredMercenaries = mercenaryList.filter(
    (item) =>
      item.type === (isMercenaryPersonal ? "mercenary" : "mercenary_team") &&
      (mercenaryRegion === "전체" || item.region === mercenaryRegion) &&
      item.title.includes(mercenarySearch)
  );

  const filteredTeams = teamList.filter(
    (item) =>
      item.type === (isTeamRecruitPersonal ? "team" : "team_team") &&
      (teamRegion === "전체" || item.region === teamRegion) &&
      item.title.includes(teamSearch)
  );

  const filteredMatches = matchList.filter(
    (item) =>
      (matchRegion === "전체" || item.region === matchRegion) &&
      item.title.includes(matchSearch)
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">조기축구 모집 플랫폼</h1>
      <HeroBanner />

      {/* 🔹 용병 목록 */}
      <SectionWithToggle
        title="용병 목록"
        toggleState={isMercenaryPersonal}
        onToggle={() => setIsMercenaryPersonal((prev) => !prev)}
        link="/mercenary"
      >
        <MercenaryFilterGroupWrapper
          searchValue={mercenarySearch}
          selectedRegion={mercenaryRegion}
          onSearchChange={setMercenarySearch}
          onRegionChange={setMercenaryRegion}
          onReset={() => {
            setMercenarySearch("");
            setMercenaryRegion("전체");
          }}
        />
        <CardSliderContainer>
          {filteredMercenaries.map((card) => (
            <SummaryCard key={card.id} {...card} />
          ))}
        </CardSliderContainer>
      </SectionWithToggle>

      {/* 🔹 팀 모집 */}
      <SectionWithToggle
        title="팀 모집"
        toggleState={isTeamRecruitPersonal}
        onToggle={() => setIsTeamRecruitPersonal((prev) => !prev)}
        link="/team"
      >
        <TeamFilterGroupWrapper
          searchValue={teamSearch}
          selectedRegion={teamRegion}
          onSearchChange={setTeamSearch}
          onRegionChange={setTeamRegion}
          onReset={() => {
            setTeamSearch("");
            setTeamRegion("전체");
          }}
        />
        <CardSliderContainer>
          {filteredTeams.map((card) => (
            <SummaryCard key={card.id} {...card} />
          ))}
        </CardSliderContainer>
      </SectionWithToggle>

      {/* 🔹 경기 모집 */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">경기 모집</h2>
          <a href="/match" className="text-blue-500 hover:underline">
            더보기 →
          </a>
        </div>
        <MatchFilterGroupWrapper
          searchValue={matchSearch}
          selectedRegion={matchRegion}
          onSearchChange={setMatchSearch}
          onRegionChange={setMatchRegion}
          onReset={() => {
            setMatchSearch("");
            setMatchRegion("전체");
          }}
        />
        <CardSliderContainer>
          {filteredMatches.map((card) => (
            <SummaryCard key={card.id} {...card} />
          ))}
        </CardSliderContainer>
      </section>
    </div>
  );
};

export default Home;
