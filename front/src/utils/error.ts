import type { AxiosError } from "axios";

interface ApiError {
  detail: string;
}

export const getErrorMessage = (error: AxiosError<ApiError>) => {
  const detail = error.response?.data.detail;
  if (!detail) return "잠시 후 다시 시도해 주세요";
  return detail;
};
