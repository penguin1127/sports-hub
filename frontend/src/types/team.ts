// src/types/team.ts

export interface TeamSummary {
  id: number;
  name: string;
  logoUrl: string | null;
  region: string;
  roleInTeam: string; // 예: "LEADER", "MEMBER"
}