import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import React from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TrackingPage from "./pages/TrackingPage";

import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import AdminHistory from "./pages/AdminHistory";
import { useAuth } from "./context/AuthContext";

// Define a wrapper for routes that need Layout
function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  const { state } = useAuth();

  // Manage tracking code state
  const [trackingCode, setTrackingCode] = React.useState("");

  const handleTrackingCodeSave = (code: string) => {
    setTrackingCode(code);
  };

  if (state.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Routes with Layout */}
        <Route element={<LayoutWrapper />}>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/track"
            element={
              <TrackingPage
                trackingCode={trackingCode}
                onSave={handleTrackingCodeSave}
              />
            }
          />
          <Route path="/adhistory" element={<AdminHistory />} />
        </Route>

        {/* Auth Pages */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Admin and User Forms */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage trackingCode={trackingCode} />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
