import { apiClient } from "../api/client";

export type LoginPayload = {
  folio: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  return data;
}
