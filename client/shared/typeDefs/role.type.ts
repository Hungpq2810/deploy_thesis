export interface ICreateRole {
  name: string;
  description: string;
  routePath: string;
}
export interface IUpdateRole {
  userId: number;
  attributes: { role: any[] };
  groupIdLeave: number;
  groupIdJoin: number;
}
export interface IDeleteGroupRole {
  roleId: number;
  groupId: string;
}
export interface IRoles {
  id: string;
  name: string;
  path: string;
  subGroups: any[];
}

// export type ROLE = "ADMIN"|"USER"|
