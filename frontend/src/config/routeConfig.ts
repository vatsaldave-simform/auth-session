import type { ComponentType } from "react";
import { Home } from "../pages/public/Home";
import NotFound from "../pages/public/NotFound";
import Login  from "../pages/auth/Login";
import Register  from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

export type RouteType = {
  path: string;
  element: ComponentType;
  children?: RouteType[];
  auth?: "public" | "protected" | "auth-only";
};

// Public routes - accessible to everyone
const publicRoutes: RouteType[] = [
  {
    path: "/",
    element: Home,
    auth: "public",
  },
  {
    path: "/404",
    element: NotFound,
    auth: "public",
  },
];

// Auth-only routes - only for non-authenticated users
const authOnlyRoutes: RouteType[] = [
  {
    path: "/login",
    element: Login,
    auth: "auth-only",
  },
  {
    path: "/register",
    element: Register,
    auth: "auth-only",
  },
];

// Protected routes - only for authenticated users
const protectedRoutes: RouteType[] = [
  {
    path: "/dashboard",
    element: Dashboard,
    auth: "protected",
  },
];

// Combine all routes
export const routes: RouteType[] = [
  ...publicRoutes,
  ...authOnlyRoutes,
  ...protectedRoutes,
];
