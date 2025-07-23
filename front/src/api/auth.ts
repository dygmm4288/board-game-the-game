import type { Axios } from "axios";
import axiosInstance from ".";
import type User from "../models/user";

interface AuthPayload {
  name: string;
  pwd: string;
  confirmPwd?: string;
}

interface SignInResponse {
  accessToken: string;
  user: Omit<User, "password">;
}

class AuthAPi {
  axios: Axios;

  constructor() {
    this.axios = axiosInstance;
  }

  signIn(payload: AuthPayload) {
    return this.axios.post<SignInResponse>("/auth/signin", payload);
  }

  singUp(payload: AuthPayload) {
    return this.axios.post("/auth/signup", payload);
  }
}

const authAPI = new AuthAPi();
export default authAPI;
