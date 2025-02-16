import axios, { HttpStatusCode, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { AnyJson } from '@app/types/common-types';

export interface RequestConfig {
  auth?: { username: string; password: string };
  params?: AnyJson;
  data?: AnyJson;
}

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

  public setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
    this.createAxiosInstance();
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
    return response.data;
  }

  public async post<T>(url: string, data?: AnyJson | FormData, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response;
  }

  public async patch<T>(url: string, data?: AnyJson | FormData, config?: AxiosRequestConfig) {
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
      response => response,
      async error => {
        const originalRequest = error.config;

        if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(error.response?.status) && !originalRequest._retry) {
          throw new Error('Session expired');
        }
      },
    );
  }
}
