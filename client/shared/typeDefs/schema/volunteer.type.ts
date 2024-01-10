import { IAppliedVolunteerMapped } from './activity.type';

export interface IRequestVolunteers {
  requestVolunteers: IRequestVolunteer[];
}

export interface IRequestVolunteer {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  organization_id: number;
  status: number;
  created_at?: any;
  updated_at?: any;
  volunteersApplied?: IAppliedVolunteerMapped[];
}

export interface IVolunteerGroupOrganizer {
  id: number;
  user_id: number;
  organization_id: number;
  name: string;
  avatar: string;
  status: number;
  created_at?: any;
  updated_at?: any;
}
