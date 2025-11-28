import { Routes, Route } from "react-router-dom";
import RoleSelectPage from "./pages/RoleSelectPage.jsx";
import RangerLoginPage from "./pages/RangerLoginPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import RangerNewIncidentPage from "./pages/RangerNewIncidentPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelectPage />} />
      <Route path="/ranger-login" element={<RangerLoginPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/ranger-report" element={<RangerNewIncidentPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
    </Routes>
  );
}

export default App;
