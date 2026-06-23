import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BannerProvider } from "./context/BannerContext";
import PublicLayout from "./layouts/PublicLayout";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import MerchantDetail from "./pages/MerchantDetail";
import Claim from "./pages/Claim";
import BannerAds from "./pages/BannerAds";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import MerchantDashboard from "./pages/dashboard/MerchantDashboard";
import UserDashboard from "./pages/dashboard/DashboardUser";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

function ProtectedRoute({ allowedRoles, children }) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || !user) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/merchant/:id" element={<MerchantDetail />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/banner-ads" element={<BannerAds />} />
        <Route path="/pricing" element={<Pricing />} />
      </Route>

      {/* Auth - no shared layout */}
      <Route path="/auth" element={<Auth />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard/merchant"
        element={
          <ProtectedRoute allowedRoles={["merchant", "registered-merchant"]}>
            <MerchantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BannerProvider>
          <AppRoutes />
        </BannerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
