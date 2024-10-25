import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/clientPages/home/HomePage";
import AdminDashboard from "./pages/adminPages/dashboard/AdminDashboard";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import UserLogin from "./components/userLoginAndRegister/UserLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login2" element={<UserLogin />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
