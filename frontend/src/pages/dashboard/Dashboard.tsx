import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../services/profile.services";
import type { ProfileResponse } from "../../types/profile.types";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile data when component mounts
    fetchUserProfile()
      .then((data) => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile information");
        setIsLoading(false);
      });
  }, []);

  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-center text-xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-center text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="relative overflow-hidden">
        {/* Use the shared Navbar component */}
        <Navbar />

        {/* Main content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {/* Page header */}
              <div className="pb-5 border-b border-gray-200 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              </div>

              {/* User Profile Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                {/* User info header */}
                <div className="border-b border-gray-200 bg-indigo-50 px-4 py-5 sm:px-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
                      <svg
                        className="h-8 w-8 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h2 className="text-xl font-bold leading-6 text-gray-900">
                        Welcome, {profile?.data?.user?.name ?? "User"}!
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Here's your profile information
                      </p>
                    </div>
                  </div>
                </div>

                {/* User details */}
                <div className="px-4 py-5 sm:p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Name
                      </dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">
                        {profile?.data?.user?.name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">
                        {profile?.data?.user?.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        User ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        {profile?.data?.user?.id}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Account Created
                      </dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">
                        {profile?.data?.user?.createdAt
                          ? formatDate(
                              profile?.data?.user?.createdAt.toString()
                            )
                          : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
