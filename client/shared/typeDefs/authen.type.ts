export interface IAuthen {
  token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token?: any;
  'not-before-policy': number;
  session_state: string;
  scope: string;
  error?: any;
  error_description?: any;
  error_uri?: any;
}

export interface IJwtDecode {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: Realmaccess;
  resource_access: Resourceaccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  role: string;
  preferred_username: string;
}

interface Resourceaccess {
  'realm-management': Realmaccess;
}

interface Realmaccess {
  roles: string[];
}
