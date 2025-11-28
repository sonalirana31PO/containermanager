import { useState, createContext, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Login } from "@/components/Login";
import { AppShell } from "@/components/AppShell";
import { Dashboard } from "@/components/pages/Dashboard";
import { ContainerList } from "@/components/pages/ContainerList";
import { ContainerDetail } from "@/components/pages/ContainerDetail";
import { Invoices } from "@/components/pages/Invoices";
import { FleetManagement } from "@/components/pages/FleetManagement";
import { CustomerAdmin } from "@/components/pages/CustomerAdmin";
import { Integrations } from "@/components/pages/Integrations";
import { ShipmentsBookings } from "@/components/pages/ShipmentsBookings";
import { Reports } from "@/components/pages/Reports";
import { Toaster } from "@/components/ui/sonner";

type UserRole = "customer" | "admin" | null;

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedContainerId: string | null;
  setSelectedContainerId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userRole } = useApp();

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { userRole } = useApp();

  if (userRole !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { userRole, setUserRole, setSelectedContainerId } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setSelectedContainerId(null);
    navigate("/login");
  };

  const handleContainerSelect = (containerId: string) => {
    setSelectedContainerId(containerId);
    navigate(`/containers/${containerId}`);
  };

  // Redirect to dashboard if logged in and at root or login
  if (userRole && (location.pathname === "/" || location.pathname === "/login")) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        element={
          <ProtectedRoute>
            <AppShell onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard onContainerSelect={handleContainerSelect} />} />
        <Route path="/containers" element={<ContainerList onContainerSelect={handleContainerSelect} />} />
        <Route path="/containers/:containerId" element={<ContainerDetail />} />
        <Route path="/shipments" element={<ShipmentsBookings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/invoices" element={<Invoices />} />

        {/* Admin-only routes */}
        <Route
          path="/fleet"
          element={
            <AdminRoute>
              <FleetManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <AdminRoute>
              <CustomerAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <AdminRoute>
              <Integrations />
            </AdminRoute>
          }
        />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(
    null
  );

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        selectedContainerId,
        setSelectedContainerId,
      }}
    >
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
