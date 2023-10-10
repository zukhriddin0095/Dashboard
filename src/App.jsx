import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout/Adminlayout/AdminLayout";
import DashboardPage from "./pages/Admin/dashboard/DashboardPage";
import SkillsPage from "./pages/Admin/skills/SkillsPage";
import LoginPage from "./pages/public/Login/LoginPage";
import ExperiencesPage from "./pages/Admin/experiences/ExperiencesPage";
import { useSelector } from "react-redux";
import PortfolioPage from "./pages/Admin/portfolio/PortfolioPage";
import UsersPage from "./pages/Admin/users/UsersPage";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          }
        />
        {isAuthenticated ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<Navigate to="/" />} />
        {/* <Route path=''/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
