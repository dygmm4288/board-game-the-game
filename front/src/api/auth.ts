import type { Axios } from "axios";
import axiosInstance from ".";
import { generateFormData } from "./crud";

class AuthAPi {
  axios: Axios;

  constructor() {
    this.axios = axiosInstance;
  }

  signIn(dict: object) {
    const formData = generateFormData(dict);
    return this.axios.post("/auth/signin", formData);
  }

  singUp(dict: object) {
    const formData = generateFormData(dict);
    return this.axios.post("/auth/signup", formData);
  }
}

const authAPI = new AuthAPi();
export default authAPI;
