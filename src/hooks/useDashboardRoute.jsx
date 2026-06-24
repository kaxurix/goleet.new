import { useAuth } from "../context/AuthContext";

export function getDashboardRoute(role) {
  if (role === "admin") {
    return "/dashboard/admin";
  }

  if (role === "merchant" || role === "registered-merchant") {
    return "/dashboard/merchant";
  }

  return "/dashboard/user";
}

export function useDashboardRoute() {
  const { user } = useAuth();
  return getDashboardRoute(user?.role);
}
