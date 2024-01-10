import { AxiosResponse } from 'axios';
import { https, httpsNoToken } from '../config/https.config';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import { IFaq, IFaqs } from '@/typeDefs/schema/faq.type';

class FaqService {
  getAllFaq(): Promise<AxiosResponse<IBaseResponse<IFaqs>>> {
    return httpsNoToken.get('/faq');
  }
  getFaqById(id: number): Promise<AxiosResponse<IBaseResponse<IFaq>>> {
    return httpsNoToken.get(`/faq/${id}`);
  }
  newFaq(body: { question: string; answer: string }) {
    return https.post('/admin/faq', body);
  }
  updateFaq(id: number, body: { question: string; answer: string }) {
    return https.put(`/admin/faq/${id}`, body);
  }
  deleteFaq(id: number) {
    return https.delete(`/admin/faq/${id}`);
  }
}

export const faqService = new FaqService();
