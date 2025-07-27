import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import store, { ACCESS_TOKEN_KEY, USER_KEY } from "../utils/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const attachAuthHeader = (config: InternalAxiosRequestConfig) => {
  const token = store.load(ACCESS_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const redirectOnUnauthorized = (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    const nextPath = encodeURIComponent(
      window.location.pathname + window.location.search,
    );

    store.delete(ACCESS_TOKEN_KEY);
    store.delete(USER_KEY);

    window.location.href = `/login?nextPath=${nextPath}`;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    config = attachAuthHeader(config);

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    redirectOnUnauthorized(error);

    return Promise.reject(error);
  },
);

export default axiosInstance;
