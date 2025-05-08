import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getLocalStorageData } from "../../utils/localStorage.utils";
import { IS_AUTHENTICATED } from "../../constants";

export const Home = () => {
  const isAuthenticated = JSON.parse(
    getLocalStorageData(IS_AUTHENTICATED) ?? "false"
  );
  return (
    <div className="bg-white min-h-screen">
      <div className="relative overflow-hidden">
        <Navbar />

        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Secure Authentication</span>{" "}
              <span className="block text-indigo-600 xl:inline">
                Made Simple
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              A demonstration of a secure authentication system using React,
              TypeScript and modern web standards.
            </p>
            {!isAuthenticated && (
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="/login"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Log in
                  </a>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
