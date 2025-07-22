import type { Axios } from "axios";
import { forEach } from "lodash-es";
import axiosInstance from ".";

class IO {
  axios: Axios;
  url: string;
  constructor(url: string) {
    this.axios = axiosInstance;
    this.url = url;
  }
  post(dict: object) {
    const formData = new FormData();

    forEach(dict, (value: string | object | number, key: string) => {
      if (typeof value === "string") formData.append(key, value);
      if (typeof value === "number") formData.append(key, String(value));
      if (typeof value === "object")
        formData.append(key, JSON.stringify(value));
    });

    return this.axios.post(this.url, formData);
  }

  get(params) {
    return this.axios.get();
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
