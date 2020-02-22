import React from 'react';
import axios, { AxiosInstance } from 'axios';

const URLMAP = {
  dev: 'http://192.168.1.141:4000/api/',
  prod: 'https://something.else.com/api/',
};

type method = 'GET' | 'POST';
interface RequestConfig {
  method?: method;
  headers?: { [key: string]: string };
  data?: string;
}

export class ApiClient {
  private axiosClient: AxiosInstance;

  constructor(env: keyof typeof URLMAP) {
    this.axiosClient = axios.create({ baseURL: URLMAP[env] });
  }

  request = async <T>(path: string, config?: RequestConfig): Promise<T> => {
    try {
      const result = await this.axiosClient.request<T>({
        url: path,
        method: config?.method,
        headers: config?.headers,
        data: config?.data,
      });
      return result.data;
    } catch (e) {
      throw new Error(e);
    }
  };
}

export const ApiContext = React.createContext<ApiClient | undefined>(undefined);
