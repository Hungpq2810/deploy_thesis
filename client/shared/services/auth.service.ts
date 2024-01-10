import { IBaseResponse } from '../typeDefs/baseReponse.type';
import { AxiosResponse } from 'axios';
import { IAuthen } from '../typeDefs/authen.type';
import { httpsNoToken } from '@/config/https.config';
class AuthService {
  register(body: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    gender: number;
    birthday: Date;
    address: string;
    avatar: string;
  }): Promise<AxiosResponse<IBaseResponse<IAuthen>>> {
    return httpsNoToken.post('/register', body);
  }
  authenticated(body: {
    username: string;
    password: string;
  }): Promise<AxiosResponse<IBaseResponse<IAuthen>>> {
    return httpsNoToken.post('/login', body);
  }
}

export const authService = new AuthService();
