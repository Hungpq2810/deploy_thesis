export interface ISkillUserList {
  skillUsers: ISkillUser[];
}

export interface ISkillUser {
  id: number;
  user_id: number;
  skill_id: number;
  created_at: string;
  updated_at: string;
}
