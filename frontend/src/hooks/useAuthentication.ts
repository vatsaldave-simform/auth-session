import { useState, useEffect, useCallback } from "react";
import { fetchUserProfile } from "../services/profile.services";
import {
  getLocalStorageData,
  removeLocalStorageData,
  setLocalStorageData,
} from "../utils/localStorage.utils";
import { ACCESS_TOKEN, IS_AUTHENTICATED } from "../constants";
import type { User } from "../types/common.types";

interface UseAuthentication {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Simple authentication hook that checks if a user is authenticated
 * by calling the profile API with the stored token
 */
export const useAuthentication = (): UseAuthentication => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /**
   * Check authentication status by calling profile API
   * Returns true if authenticated, false otherwise
   */
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // First check if token exists
      const token = getLocalStorageData(ACCESS_TOKEN);
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        removeLocalStorageData(IS_AUTHENTICATED);
        return false;
      }

      // Call the profile API
      const profileResponse = await fetchUserProfile();

      // If we get a valid user response, user is authenticated
      if (profileResponse?.data?.user) {
        setUser(profileResponse.data.user);
        setIsAuthenticated(true);
        setLocalStorageData(IS_AUTHENTICATED, JSON.stringify(true));
        return true;
      } else {
        // No valid user data in response
        removeLocalStorageData(ACCESS_TOKEN);
        setUser(null);
        setIsAuthenticated(false);
        removeLocalStorageData(IS_AUTHENTICATED);
        return false;
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      removeLocalStorageData(ACCESS_TOKEN);
      setUser(null);
      setIsAuthenticated(false);
      removeLocalStorageData(IS_AUTHENTICATED);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};
