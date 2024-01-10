import { IActivity } from './activity.type';

export interface IFeedBacks {
  feedbacks: IFeedback[];
}

export interface IFeedback {
  id: number;
  user_id: number;
  activity_id?: number;
  title: string;
  content: string;
  rate?: number;
  created_at?: any;
  updated_at?: any;
  name?: string;
  avatar?: string;
  activity?: IActivity | null | undefined;
}
