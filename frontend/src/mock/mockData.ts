// 2. mockData.ts (자세히)
// src/mock/mockData.ts

export type CardType =
  | "team"
  | "team_team"
  | "mercenary"
  | "mercenary_team"
  | "match";

export interface SummaryCardData {
  id: number;
  type: CardType;
  title: string;
  date: string;
  region: string;
  description: string;
  thumbnail: string;
}

export const mercenaryList: SummaryCardData[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  type: i % 2 === 0 ? "mercenary" : "mercenary_team",
  title: `용병 모집 ${i + 1}`,
  date: "2025-04-11",
  region: "서울",
  description: "주말 경기에서 함께 뛰실 용병 구합니다!",
  thumbnail: `https://source.unsplash.com/random/400x300?football&sig=${i}`,
}));

export const teamList: SummaryCardData[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  type: i % 2 === 0 ? "team" : "team_team",
  title: `팀원 모집 ${i + 1}`,
  date: "2025-04-11",
  region: "경기",
  description: "꾸준히 활동할 팀원 찾습니다.",
  thumbnail: `https://source.unsplash.com/random/400x300?soccer&sig=${i}`,
}));

export const matchList: SummaryCardData[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  type: "match",
  title: `매치 모집 ${i + 1}`,
  date: "2025-04-11",
  region: "부산",
  description: "친선 경기를 위한 매치를 구해요.",
  thumbnail: `https://source.unsplash.com/random/400x300?sports&sig=${i}`,
}));
