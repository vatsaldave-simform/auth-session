import type { ProfileResponse } from "../types/profile.types";
import { fetchWrapper, getHeaders } from "../utils/fetch.utils";

// Get user profile
export const fetchUserProfile = async (): Promise<ProfileResponse> => {
  return fetchWrapper<ProfileResponse>("/auth/profile", {
    method: "GET",
    headers: getHeaders({ isAuth: true }),
  });
};
