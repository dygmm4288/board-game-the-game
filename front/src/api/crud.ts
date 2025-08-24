import type { Axios } from "axios";
import axiosInstance from ".";

class IO {
  axios: Axios;
  url: string;
  constructor(url: string) {
    this.axios = axiosInstance;
    this.url = url;
  }
  post<T>(payload?: object) {
    return this.axios.post<T>(this.url, payload);
  }

  get(params) {
    return this.axios.get(this.url, params);
  }

  get_one(id) {
    return this.axios.get();
  }

  delete(id) {
    return this.axios.delete();
  }

  put(id) {
    return this.axios.put();
  }
}

export default IO;
