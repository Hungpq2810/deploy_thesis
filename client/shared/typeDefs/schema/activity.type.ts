import { IFeedback } from './feedback.type';
import { IOrganization } from './organization.type';
import { ISkill } from './skill.type';

export interface IActivityList {
  activities: IActivity[];
}
export interface IActivity {
  id: number;
  creator_id: number;
  creator: string;
  name: string;
  description: string;
  image: string;
  location: string;
  num_of_accepted: number;
  max_of_volunteers: number;
  register_from: string;
  register_to: string;
  start_date: string;
  end_date: string;
  status: number;
  created_at: string;
  updated_at: string;
  feedback?: IFeedback[];
  skillsActivity?: ISkill[];
  inforOrganizer?: IOrganization;
  volunteersApplied?: IAppliedVolunteerMapped[];
}

export interface IAppliedVolunteers {
  appliedVolunteers: IAppliedVolunteer[];
}

export interface IAppliedVolunteer {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  organizer: number;
  status: number;
  user_id: number;
  activity_id: number;
  created_at: string;
  updated_at: string;
  activity?: IActivity;
}

export interface IAppliedVolunteerMapped {
  id: number;
  name: string;
  avatar: string;
  status: number;
  organizer?: number;
  created_at: string;
  updated_at: string;
}
