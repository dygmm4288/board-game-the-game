import type { Axios } from "axios";
import axiosInstance from ".";

interface AuthPayload {
  name: string;
  pwd: string;
  confirmPwd?: string;
}

class AuthAPi {
  axios: Axios;

  constructor() {
    this.axios = axiosInstance;
  }

  signIn(payload: AuthPayload) {
    return this.axios.post("/auth/signin", payload);
  }

  singUp(payload: AuthPayload) {
    return this.axios.post("/auth/signup", payload);
  }
}

const authAPI = new AuthAPi();
export default authAPI;
