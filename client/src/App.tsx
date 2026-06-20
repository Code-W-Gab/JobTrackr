import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ApplicationPage from "./pages/ApplicationPage";
import KanbanViewPage from "./pages/KanbanViewPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <div>
      <Routes>
        {/* HomePages */}
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<HomePage />} />

        {/* Auth Pages */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/kanban-board" element={<KanbanViewPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}