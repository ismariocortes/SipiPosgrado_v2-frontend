import { apiClient } from "../api/client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginUser = {
  id: number;
  email: string;
  folio: string | null;
  user_status: {
    id: number;
    code: string;
  };
};

export type LoginResponse = {
  message: string;
  token: string;
  user: LoginUser;
};

export type RegisterPayload = {
  identity_type: "curp" | "passport";
  identity_value: string;
  email: string;
  phone: string;
};

export type RegisterResponse = {
  message: string;
  user: LoginUser;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>(
    "/auth/register",
    payload,
  );
  return data;
}
