import { routes } from "../config/routeConfig";
import { ACCESS_TOKEN } from "../constants";
import { refreshAccessToken } from "../services/auth.services";
import {
  getLocalStorageData,
  removeLocalStorageData,
  setLocalStorageData,
} from "./localStorage.utils";

// Function to determine if the current route is protected
const isProtectedRoute = (): boolean => {
  const currentPath = window.location.pathname;

  // Find the current route configuration
  const currentRoute = routes.find((route) => {
    // Check exact match or if it's a parent route
    return (
      currentPath === route.path ||
      (currentPath.startsWith(route.path) && route.path !== "/")
    );
  });

  return currentRoute?.auth === "protected";
};

// Function to get headers with optional auth
export const getHeaders = (
  options: {
    isAuth?: boolean;
    contentType?: string;
  } = {}
) => {
  const { isAuth = false, contentType = "application/json" } = options;

  const headers: Record<string, string> = {
    "Content-Type": contentType,
  };

  if (isAuth) {
    const token = getLocalStorageData(ACCESS_TOKEN);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Enhanced fetch wrapper with prefixed API_URL
export const fetchWrapper = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const isCurrentRouteProtected = isProtectedRoute();
  try {
    let response;
    // Ensure endpoint starts with '/' for proper URL construction
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${import.meta.env.VITE_APP_API_URL}${path}`;

    // Add credentials: "include" to send cookies with request
    const enhancedOptions: RequestInit = {
      ...options,
      credentials: "include",
    };
    response = await fetch(url, enhancedOptions);

    if (response.status === 401 && isCurrentRouteProtected) {
      const refreshTokenResponse = await refreshAccessToken();
      if (refreshTokenResponse.data.accessToken) {
        setLocalStorageData(
          ACCESS_TOKEN,
          refreshTokenResponse.data.accessToken
        );
        // Retry the original request with the new token
        response = await fetch(url, {
          ...options,
          headers: getHeaders({ isAuth: true }),
        });
      } else {
        // Handle unauthorized - clear token
        removeLocalStorageData(ACCESS_TOKEN);
        window.location.href = "/login";
        throw new Error("Your session has expired. Please log in again.");
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message ?? "An error occurred");
    }

    return data as T;
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      // Handle non-JSON responses
      throw new Error("Invalid response format");
    }
    throw error;
  }
};
