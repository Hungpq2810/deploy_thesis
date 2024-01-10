import { APP_SAVE_KEYS } from '@/constant/AppConstant';
import { authService } from '@/services/auth.service';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import axios, { AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';

declare module 'axios' {
  export interface AxiosRequestConfig {
    throwAccessDenied?: boolean;
  }
}
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

class AxiosConfig {
  baseUrl = BASE_URL;
  token =
    getCookie(APP_SAVE_KEYS.KEYS);
  axiosConfig = {
    baseURL: this.baseUrl,
    headers: {
      'Accept-Language': 'vi-VN',
      'Content-Type': 'application/json'
    }
  };

  get getAxiosInstance() {
    const axiosInstance = axios.create(this.axiosConfig);
    axiosInstance.interceptors.request.use((req) => {
      if (this.token && req.headers)
        req.headers['Authorization'] = `Bearer ${this.token}`;
      return req;
    });
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(error);
      }
    );
    return axiosInstance;
  }
  get getAxiosInstanceNoAuth() {
    const axiosInstance = axios.create(this.axiosConfig);
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 403) {
          // redirect
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
    return axiosInstance;
  }
}
export const https = new AxiosConfig().getAxiosInstance;
export const httpsNoToken = new AxiosConfig().getAxiosInstanceNoAuth;
