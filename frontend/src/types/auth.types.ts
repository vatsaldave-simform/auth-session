import type { ApiResponse, User } from "./common.types";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = ApiResponse<{
  user: User;
  accessToken: string;
}>;

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = ApiResponse<{
  user: User;
  accessToken: string;
}>;

export type RefreshAccessTokenResponse = ApiResponse<{
  accessToken: string;
}>;
