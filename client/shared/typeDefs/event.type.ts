export interface IEvent {
  time: number;
  type: string;
  realmId: string;
  clientId: string;
  userId: string;
  sessionId: string;
  ipAddress: string;
  details: Details;
}

interface Details {
  auth_method: string;
  token_id: string;
  grant_type: string;
  refresh_token_type: string;
  scope: string;
  refresh_token_id: string;
  client_auth_method: string;
  username: string;
}
