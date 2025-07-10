import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Activation from "./pages/Activation";
import Dashboard from "./pages/Dashboard";
import AdminActivation from "./pages/AdminActivation";
import AdminDashboard from "./pages/AdminDashboard";
import EducationDashboard from "./pages/EducationDashboard";
import StaffManagement from "./pages/StaffManagement";
import GroupsManagement from "./pages/GroupsManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activation" element={<Activation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-activation" element={<AdminActivation />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin-dashboard/education"
              element={<EducationDashboard />}
            />
            <Route
              path="/admin-dashboard/staff"
              element={<StaffManagement />}
            />
            <Route
              path="/admin-dashboard/groups"
              element={<GroupsManagement />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
