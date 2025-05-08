import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../services/auth.services";
import { getLocalStorageData } from "../utils/localStorage.utils";
import { IS_AUTHENTICATED } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = JSON.parse(
    getLocalStorageData(IS_AUTHENTICATED) ?? "false"
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative pt-6 pb-16 sm:pb-24">
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link
              to={isAuthenticated ? "/dashboard" : "/"}
              className="text-2xl font-extrabold text-indigo-600"
            >
              Auth Demo
            </Link>
          </div>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-6">
          {isAuthenticated ? (
            <>
              {/* Dashboard Link - only shown if on a different page */}
              {window.location.pathname !== "/dashboard" && (
                <Link
                  to="/dashboard"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Dashboard
                </Link>
              )}
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
