import { ISkill } from './skill.type';

export interface IUserList {
  users: IUser[];
}
export interface IUser {
  id: number;
  role_id: number;
  organization_id?: any;
  username: string;
  password?: string;
  name: string;
  email: string;
  phone?: string;
  gender?: number;
  birthday?: string;
  address?: string;
  avatar?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  skills?: ISkill[];
  belongsOrganizer?: any;
  activityApplied?: any;
}
