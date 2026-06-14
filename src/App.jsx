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

function ProtectedMerchant() {
  const { isLoggedIn, loginAsMerchant } = useAuth();
  if (!isLoggedIn) {
    // Auto-login as merchant for demo purposes
    loginAsMerchant();
  }
  return <MerchantDashboard />;
}

function ProtectedAdmin() {
  const { isLoggedIn, loginAsAdmin } = useAuth();
  if (!isLoggedIn) {
    loginAsAdmin();
  }
  return <AdminDashboard />;
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
      <Route path="/dashboard/merchant" element={<ProtectedMerchant />} />
      <Route path="/dashboard/admin" element={<ProtectedAdmin />} />
      <Route path="/dashboard/user" element={<UserDashboard />} />
      <Route path="/admin" element={<ProtectedAdmin />} />

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
