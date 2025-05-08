import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./hocs/ProtectedRoute";
import PublicOnlyRoute from "./hocs/PublicOnlyRoute";
import { routes } from "./config/routeConfig";
import type { RouteType } from "./config/routeConfig";

export const AppRoutes = () => {
  // Function to render routes based on authentication requirement
  const renderRoutes = (routes: RouteType[]) => {
    return routes.map((route) => {
      // Create the element based on the route configuration
      const RouteElement = route.element;
      if (route.auth === "protected") {
        return (
          <Route key={route.path} element={<ProtectedRoute />}>
            <Route path={route.path} element={<RouteElement />} />
          </Route>
        );
      } else if (route.auth === "auth-only") {
        return (
          <Route key={route.path} element={<PublicOnlyRoute />}>
            <Route path={route.path} element={<RouteElement />} />
          </Route>
        );
      } else {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<RouteElement />}
          />
        );
      }
    });
  };

  return (
    <Routes>
      {renderRoutes(routes)}
      {/* Catch-all route for 404s */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
