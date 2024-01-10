export interface IActivityApplyList {
  activityApplyList: IActivityApply[];
}

export interface IActivityApply {
  id: number;
  user_id: number;
  activity_id: number;
  status: number;
  created_at: string;
  updated_at: string;
}
