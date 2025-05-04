import { User } from "@prisma/client";

export type TokenPayload = {
  userId: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserResponse = Omit<User, "password" | "refreshToken">;

export type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
