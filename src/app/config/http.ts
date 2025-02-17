import axios, { HttpStatusCode, type AxiosInstance, type AxiosRequestConfig } from 'axios';

// import { rootStore } from '@store/root-store';
import { AnyObject } from '@app/types/common.types';
import { ErrorCode } from '@app/types/statuses.types';
import { Platform } from 'react-native';
// import { sessionSlice } from '@store/slices/session.slice';

export interface RequestConfig {
  auth?: { username: string; password: string };
  params?: AnyObject;
  data?: AnyObject;
}

export interface Headers {
  [header: string]: string | number;
}

class Http {
  private baseURL: string;
  private headers: Headers;
  private axiosInstance: AxiosInstance;

  public constructor(baseURL: string = '', headers: Headers = {}) {
    this.baseURL = baseURL;
    this.headers = headers;

    this.axiosInstance = axios.create({ baseURL, headers });
  }

  public addBearerToken(token: string) {
    this.addHeader('Authorization', `Bearer ${token}`);
  }

  public addHeader(header: string, value: string | number) {
    this.headers[header] = value;
    this.createAxiosInstance();
  }

  public cleanHeaders() {
    this.headers = {};
    this.createAxiosInstance();
  }

  public async get<T>(url: string, config?: RequestConfig) {
    const response = await this.axiosInstance.get<T>(url, config);
    return response;
  }

  public async post<T>(url: string, data?: AnyObject | FormData, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response;
  }

  public async patch<T>(url: string, data?: AnyObject | FormData, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response;
  }

  public async delete<T>(url: string, config?: RequestConfig) {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response;
  }

  private createAxiosInstance() {
    this.axiosInstance = axios.create({ baseURL: this.baseURL, headers: this.headers });

    this.axiosInstance.interceptors.response.use(
      response => {
        if (response.data?.error?.code === ErrorCode.WRONG_TOKEN) {
          // Todo: Uncomment after BE fix
          // rootStore.dispatch(sessionSlice.actions.expireSession());
        }
        return response;
      },
      async error => {
        const originalRequest = error.config;

        if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(error.response?.status) && !originalRequest._retry) {
          // Todo: Uncomment after BE fix
          // rootStore.dispatch(sessionSlice.actions.expireSession());
        }

        return Promise.reject(error);
      },
    );
  }
}

export const http = new Http(
  Platform.select({
    ios: process.env.EXPO_PUBLIC_IOS_API_URL,
    android: process.env.EXPO_PUBLIC_ANDROID_API_URL,
    default: process.env.EXPO_PUBLIC_IOS_API_URL,
  }),
);
