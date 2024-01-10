import { IUser } from './../user.type';
// import { IUser } from '../baseReponse.type';
export interface IOrganizations {
  organizations: IOrganization[];
}
export interface IOrganization {
  id: number;
  name: string;
  description: string;
  location: string;
  creator: IUser;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface IRequestOrganizations {
  requestOrganizations: IRequestOrganization[];
}
export interface IRequestOrganization {
  id: number;
  user: IUser;
  organization: IOrganization;
  status: number;
  created_at: string;
  updated_at: string;
}
