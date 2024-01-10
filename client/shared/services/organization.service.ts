import { AxiosResponse } from 'axios';
import { https, httpsNoToken } from '../config/https.config';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import {
  IOrganization,
  IOrganizations,
  IRequestOrganization,
  IRequestOrganizations
} from '@/typeDefs/schema/organization.type';

class OrganizationService {
  listOrganizationAdmin(): Promise<
    AxiosResponse<IBaseResponse<IOrganizations>>
  > {
    return https.get('/admin/organizations');
  }
  getAllOrganization(): Promise<AxiosResponse<IBaseResponse<IOrganizations>>> {
    return httpsNoToken.get('/organizations');
  }
  getOrganizationById(
    id: number
  ): Promise<AxiosResponse<IBaseResponse<IOrganization>>> {
    return https.get(`/organization/${id}`);
  }
  newOrganization(body: {
    name: string;
    location: string;
    description: string;
  }): Promise<AxiosResponse<IBaseResponse<IOrganization>>> {
    return https.post('/create_organization', body);
  }
  requestBecomeOrganization(body: { organization_id: number }) {
    return https.post('/request_organization', body);
  }
  updateOrganization(
    id: number,
    body: { name: string; location: string; description: string }
  ) {
    return https.put(`/admin/organizations/${id}`, body);
  }
  getAllRequestOrganization(): Promise<
    AxiosResponse<IBaseResponse<IRequestOrganizations>>
  > {
    return https.get('/admin/request_organization');
  }
  updateRequestOrganization(body: { organization_id: number; status: number }) {
    return https.put('/admin/update_request_organization', body);
  }
  // deleteUser(id: number) {
  //     return https.delete(`/admin/users/${id}`)
  // }
}

export const organizationService = new OrganizationService();
