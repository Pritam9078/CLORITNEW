import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import WalletConflictHandler from "./utils/walletConflictHandler";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardNavigator from "./components/DashboardNavigator";
import AdminDashboard from "./components/AdminDashboard";
import PanchayatDashboard from "./components/PanchayatDashboard";
import LandingPage from "./components/LandingPageNew";
import LandRegistration from "./components/LandRegistration";
import PlantationDataInput from "./components/PlantationDataInput";
import NGOVerification from "./components/NGOVerification";
import LoginOptions from "./components/LoginOptions";
import SignupOptions from "./components/SignupOptions";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import UserSignup from "./components/UserSignup";
import AdminSignup from "./components/AdminSignup";
import CommunityDashboard from "./components/CommunityDashboard";
import CommunityLeaderboard from "./components/CommunityLeaderboard";
import NGODashboard from "./components/NGODashboard";
import NGOMarketplace from "./components/NGOMarketplace";
import NGOImpactReports from "./components/NGOImpactReports";
import NGOProfile from "./components/NGOProfile";
import NGOSettings from "./components/NGOSettings";
import CorporateDashboard from "./components/CorporateDashboard";
import CorporateBuyerDashboard from "./components/CorporateBuyerDashboard";
import PanchayatAdminDashboard from "./components/PanchayatAdminDashboard";
import TrackImpact from "./components/TrackImpact";
import EarnCredits from "./components/EarnCredits";
import NDVIApp from "./components/NDVIApp";
import Preloader from "./components/Preloader";
import WalletTestPage from "./pages/WalletTestPage";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import PanchayatLandVerification from "./components/PanchayatLandVerification";
import PanchayatCommunities from "./components/PanchayatCommunities";
import PanchayatReports from "./components/PanchayatReports";
import PanchayatProfile from "./components/PanchayatProfile";
import PanchayatSettings from "./components/PanchayatSettings";
import AdminSystemControl from './components/AdminSystemControl';
import CorporateBuyerOverview from './components/CorporateBuyerOverview';
import CorporateBuyerMarketplace from './components/CorporateBuyerMarketplace';
import CorporateBuyerPortfolio from './components/CorporateBuyerPortfolio';
import CorporateBuyerESGReports from './components/CorporateBuyerESGReports';
import CorporateBuyerTransactions from './components/CorporateBuyerTransactions';
import CorporateBuyerProfile from './components/CorporateBuyerProfile';
import CorporateBuyerSettings from './components/CorporateBuyerSettings';

const queryClient = new QueryClient();

// Check if this is the first app load using sessionStorage
const isFirstLoad = () => {
  const hasLoaded = sessionStorage.getItem('clorit-app-loaded');
  return !hasLoaded;
};

const App = () => {
  const [showPreloader, setShowPreloader] = useState(isFirstLoad());
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Initialize wallet-compatible environment to prevent conflicts
    WalletConflictHandler.initializeWalletCompatibleEnvironment();

    // Mark app as loaded in sessionStorage on first load
    if (showPreloader && !sessionStorage.getItem('clorit-app-loaded')) {
      sessionStorage.setItem('clorit-app-loaded', 'true');
    }

    // Set app as ready after a minimal delay to ensure smooth transition
    if (!showPreloader) {
      const timer = setTimeout(() => setAppReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  // Show preloader only on first load
  if (showPreloader) {
    return <Preloader onLoadComplete={handlePreloaderComplete} />;
  }

  // Prevent flash of content during transition
  if (!appReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/original" element={<Index />} />

            {/* Authentication Routes */}
            <Route path="/login-options" element={<LoginOptions />} />
            <Route path="/login" element={<LoginOptions />} />
            <Route path="/signup-options" element={<SignupOptions />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/user-signup" element={<UserSignup />} />
            <Route path="/admin-signup" element={<AdminSignup />} />

            {/* User Dashboards */}
            <Route path="/community-dashboard" element={<CommunityDashboard />} />
            <Route path="/community/dashboard" element={<CommunityDashboard />} />
            <Route path="/community/leaderboard" element={<CommunityLeaderboard />} />
            <Route path="/ngo-dashboard" element={<NGODashboard />} />
            <Route path="/ngo-verification" element={<NGOVerification />} />
            <Route path="/ngo-marketplace" element={<NGOMarketplace />} />
            <Route path="/ngo-profile" element={<NGOProfile />} />
            <Route path="/ngo-settings" element={<NGOSettings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Corporate Buyer Dashboards */}
            <Route path="/corporate-buyer" element={<CorporateBuyerOverview />} />
            <Route path="/corporate-dashboard" element={<CorporateBuyerOverview />} />
            <Route path="/corporate-marketplace" element={<CorporateBuyerMarketplace />} />
            <Route path="/corporate-portfolio" element={<CorporateBuyerPortfolio />} />
            <Route path="/corporate-esg-reports" element={<CorporateBuyerESGReports />} />
            <Route path="/corporate-transactions" element={<CorporateBuyerTransactions />} />
            <Route path="/corporate-profile" element={<CorporateBuyerProfile />} />
            <Route path="/corporate-settings" element={<CorporateBuyerSettings />} />
            <Route path="/corporate-analytics" element={<CorporateBuyerDashboard />} />
            <Route path="/impact-reporting" element={<NGOImpactReports />} />
            <Route path="/panchayat-admin-dashboard" element={<PanchayatAdminDashboard />} />
            <Route path="/panchayat-admin-dashboard" element={<PanchayatAdminDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/nccr-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-projects" element={<AdminDashboard />} />
            <Route path="/admin-minting" element={<AdminDashboard />} />
            <Route path="/admin-marketplace" element={<AdminDashboard />} />
            <Route path="/admin-reports" element={<AdminDashboard />} />
            <Route path="/admin-ndvi" element={<AdminDashboard />} />
            <Route path="/admin-profile" element={<AdminDashboard />} />
            <Route path="/admin-system-control" element={<AdminSystemControl />} />
            <Route path="/admin-settings" element={<AdminDashboard />} />

            {/* Legacy/Existing Routes */}
            <Route path="/dashboards" element={<DashboardNavigator />} />
            <Route path="/buyer-marketplace" element={<CorporateBuyerDashboard />} />
            <Route path="/panchayat-dashboard" element={<PanchayatAdminDashboard />} />
            <Route path="/panchayat-land-verification" element={<PanchayatLandVerification />} />
            <Route path="/panchayat-communities" element={<PanchayatCommunities />} />
            <Route path="/panchayat-reports" element={<PanchayatReports />} />
            <Route path="/panchayat-profile" element={<PanchayatProfile />} />
            <Route path="/panchayat-settings" element={<PanchayatSettings />} />
            <Route path="/land-registration" element={<LandRegistration />} />
            <Route path="/plantation-data-input" element={<PlantationDataInput />} />
            <Route path="/ngo-verification" element={<NGOVerification />} />
            <Route path="/track-impact" element={<TrackImpact />} />
            <Route path="/earn-credits" element={<EarnCredits />} />
            <Route path="/ndvi-dashboard" element={<NDVIApp />} />

            {/* Missing Components - Placeholder Routes */}
            <Route path="/carbon-credit-minting" element={<div>Carbon Credit Minting Component Coming Soon</div>} />

            {/* Test Pages */}
            <Route path="/wallet-test" element={<WalletTestPage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
