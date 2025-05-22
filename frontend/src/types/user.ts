export interface User {
  id: number;
  name: string;
  email: string;
  userid: string;
  password: string;
  phone_number?: string;
  birth_date?: string;
  region?: string;
  preferredPosition?: string;
  is_ex_player?: boolean;
  is_captain?: boolean;
  joined_teams?: string;
  activity_start_date?: string;
  activity_end_date?: string;
}
