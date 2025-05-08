import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";

const PublicOnlyRoute = () => {
  const { isAuthenticated, isLoading } = useAuthentication();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicOnlyRoute;
