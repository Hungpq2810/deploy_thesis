import { AxiosResponse } from 'axios';
import { https, httpsNoToken } from '../config/https.config';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import {
  IRequestVolunteers,
  IVolunteerGroupOrganizer
} from '@/typeDefs/schema/volunteer.type';

class VolunteerService {
  getAllRequestVolunteer(): Promise<
    AxiosResponse<IBaseResponse<IRequestVolunteers>>
  > {
    return https.get('/organizer/request_volunteer');
  }
  updateRequestVolunteer(body: { user_id: number; status: number }) {
    return https.put('/organizer/update_request_volunteer', body);
  }
  getVolunteerGroupOrganizer(): Promise<
    AxiosResponse<IBaseResponse<IVolunteerGroupOrganizer>>
  > {
    return https.get('/organizer/volunteers');
  }
  removeVolunteerByOrganizer({ id }: { id: number }) {
    return https.delete(`/organizer/volunteers/${id}`);
  }
}

export const volunteerService = new VolunteerService();
