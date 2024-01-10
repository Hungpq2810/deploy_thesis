export interface IUser {
  id: string;
  userName: string;
  role: string;
  [key: string]: any;
}
export interface IAccount {
  [key: string]: any;
}

export interface ICreateUser {
  username: string;
  email: string;
  pass: string;
  attributes: {
    role: any;
  };
  groups: any[];
}

export interface IUserAccount {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  email?: string;
  attributes: Attributes;
  disableableCredentialTypes: any[];
  requiredActions: any[];
  notBefore: number;
  access: Access;
}

interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}

export interface Attributes {
  role: string[];
}
