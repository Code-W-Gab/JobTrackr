import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  )
}