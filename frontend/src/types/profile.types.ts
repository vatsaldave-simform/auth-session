import type { ApiResponse, User } from "./common.types";

export type ProfileResponse = ApiResponse<{
  user: User;
}>;
