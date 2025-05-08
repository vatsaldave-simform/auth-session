import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.services";
import type { LoginPayload } from "../../types/auth.types";
import ErrorAlert from "../../components/ErrorAlert";
import { setLocalStorageData } from "../../utils/localStorage.utils";
import { ACCESS_TOKEN } from "../../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      // Prepare login payload
      const loginPayload: LoginPayload = {
        email,
        password,
      };

      // Call login function from auth actions
      const loginResponse = await loginUser(loginPayload);
      if (loginResponse.data.accessToken) {
        setLocalStorageData(ACCESS_TOKEN, loginResponse.data.accessToken);
        // Navigate on success
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle errors
      const errorMessage =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Show error if any */}
        {error && (
          <div className="mb-6">
            <ErrorAlert
              title="Authentication Error"
              message={error}
              onClose={() => setError(null)}
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 transition-all duration-200 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 transition-all duration-200 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span>
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
