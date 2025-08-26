import type { Axios, AxiosRequestConfig } from "axios";
import axiosInstance from ".";

class IO {
  axios: Axios;
  baseUrl: string;

  constructor(baseUrl: string) {
    this.axios = axiosInstance;
    this.baseUrl = baseUrl;
  }

  private url(path?: string) {
    if (!path) return this.baseUrl;
    return `${this.baseUrl}${path}`;
  }

  post<T>(payload?: object) {
    return this.axios.post<T>(this.url(), payload);
  }

  get<T = unknown>(config?: AxiosRequestConfig) {
    return this.axios.get<T>(this.url(), config);
  }

  getOne<T = unknown>(id: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(this.url(id), config);
  }

  delete(id) {
    return this.axios.delete();
  }

  put(id) {
    return this.axios.put();
  }
}

export default IO;
