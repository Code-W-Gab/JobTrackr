import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

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
      </Routes>
    </div>
  )
}