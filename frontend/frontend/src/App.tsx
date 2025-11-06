import { useState } from "react";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ConnectWearable from "./components/ConnectWearable";
import Dashboard from "./components/Dashboard";
import EmergencySimulation from "./components/EmergencySimulation";
import ReportsPage from "./components/ReportsPage";
import SettingsPage from "./components/SettingsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "login" | "signup" | "connect" | "dashboard" | "emergency" | "reports" | "settings"
  >("landing");
  const [authToken, setAuthToken] = useState<string>("");

  const handleSignupSuccess = (token: string) => {
    setAuthToken(token);
    setCurrentPage("connect");
  };

  const handleLoginSuccess = (token: string) => {
    setAuthToken(token);
    setCurrentPage("connect");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00B8D9]/20 via-[#0077FF]/10 to-[#00D1FF]/20">
      {currentPage === "landing" && (
        <LandingPage
          onGetStarted={() => setCurrentPage("login")}
          onTryDemo={() => setCurrentPage("emergency")}
        />
      )}
      {currentPage === "login" && (
        <LoginPage 
          onLogin={handleLoginSuccess}
          onNavigateSignup={() => setCurrentPage("signup")}
        />
      )}
      {currentPage === "signup" && (
        <SignupPage 
          onSignupSuccess={handleSignupSuccess}
          onNavigateLogin={() => setCurrentPage("login")}
        />
      )}
      {currentPage === "connect" && (
        <ConnectWearable onConnect={() => setCurrentPage("dashboard")} />
      )}
      {currentPage === "dashboard" && (
        <Dashboard
          onEmergency={() => setCurrentPage("emergency")}
          onReports={() => setCurrentPage("reports")}
          onSettings={() => setCurrentPage("settings")}
          onLogout={() => setCurrentPage("landing")}
        />
      )}
      {currentPage === "emergency" && (
        <EmergencySimulation onReturn={() => setCurrentPage("dashboard")} />
      )}
      {currentPage === "reports" && (
        <ReportsPage onBack={() => setCurrentPage("dashboard")} />
      )}
      {currentPage === "settings" && (
        <SettingsPage onNavigate={(page) => setCurrentPage(page as any)} />
      )}
    </div>
  );
}
