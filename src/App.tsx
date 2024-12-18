import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TrackingPage from "./pages/TrackingPage";
import HistoryPage from "./pages/HistoryPage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import AdminInput from "./pages/AdminInput";
import {useAuth} from "./context/AuthContext";

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

  // Show a loader while authentication state is loading
  if (state.loading) {
    return <div>Loading...</div>; // Or use a proper loading spinner
  }

  return (
      <Router>
        <Routes>
          {/* Wrap all pages that need Layout */}
          <Route element={<LayoutWrapper />}>
            {/* Login and Register Pages (No Layout needed) */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/track" element={<TrackingPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/input" element={<AdminInput />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          {/* Default Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
  );
}

export default App;
