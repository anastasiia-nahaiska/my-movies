import axios, { HttpStatusCode, type AxiosInstance, type AxiosRequestConfig } from 'axios';

// import { rootStore } from '@store/root-store';
import { AnyObject } from '@app/types/common.types';
import { ErrorCode } from '@app/types/statuses.types';

import { config } from './config';
// import { sessionSlice } from '@store/slices/session.slice';

export interface Headers {
  [header: string]: string | number;
}

export class Http {
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

  public async get<T>(url: string, config?: AxiosRequestConfig) {
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

  public async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response;
  }

  private createAxiosInstance() {
    this.axiosInstance = axios.create({ baseURL: this.baseURL, headers: this.headers });

    // Todo: probably refactor to throw SESSION_EXPIRED value from Errors enum and create errorHandler function
    // where showing modal will triggered and add this func to catch block in each func which do request to API.
    // Need a piece of advice of the best practice to handle this case.
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

export const http = new Http(config.API_URL);
