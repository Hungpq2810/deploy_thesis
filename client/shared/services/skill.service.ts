import { AxiosResponse } from 'axios';
import { https, httpsNoToken } from '../config/https.config';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import { ISkill, ISkills } from '@/typeDefs/schema/skill.type';

class SkillService {
  getAllSkill(): Promise<AxiosResponse<IBaseResponse<ISkills>>> {
    return httpsNoToken.get('/skills');
  }
  getSkillById(id: number): Promise<AxiosResponse<IBaseResponse<ISkill>>> {
    return httpsNoToken.get(`/skills/${id}`);
  }
  newSkill(body: { name: string; description: string }) {
    return https.post('/admin/skill', body);
  }
  updateSkill(id: number, body: { name: string; description: string }) {
    return https.put(`/admin/skill/${id}`, body);
  }
  deleteSkill(id: number) {
    return https.delete(`/admin/skill/${id}`);
  }
}

export const skillService = new SkillService();
