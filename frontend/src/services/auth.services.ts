import { ACCESS_TOKEN } from "../constants";
import type {
  LoginPayload,
  LoginResponse,
  RefreshAccessTokenResponse,
} from "../types/auth.types";
import { fetchWrapper, getHeaders } from "../utils/fetch.utils";
import { setLocalStorageData } from "../utils/localStorage.utils";

// Login user
export const loginUser = async (
  loginPayload: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetchWrapper<LoginResponse>("/auth/login", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(loginPayload),
  });
  return response;
};

export const registerUser = async (
  registerPayload: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetchWrapper<LoginResponse>("/auth/register", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(registerPayload),
  });
  return response;
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  await fetchWrapper<void>("/auth/logout", {
    method: "POST",
    headers: getHeaders({ isAuth: true }),
  });
};

// Refresh access token
export const refreshAccessToken =
  async (): Promise<RefreshAccessTokenResponse> => {
    const response = await fetchWrapper<RefreshAccessTokenResponse>(
      "/auth/refresh-token",
      {
        method: "POST",
        headers: getHeaders(),
      }
    );

    // Store token
    setLocalStorageData(ACCESS_TOKEN, response.data.accessToken);

    return response;
  };
