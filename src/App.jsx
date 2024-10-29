import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/clientPages/home/HomePage";
import AdminDashboard from "./pages/adminPages/dashboard/AdminDashboard";
import LoginPage from "./pages/loginPage/LoginPage";
import UserLogin from "./components/userLoginAndRegister/UserLogin";
import UserRegistration from "./components/userLoginAndRegister/UserRegistration";
import LoginSignUpPopup from "./components/userLoginAndRegister/LoginSignUpPopup";
import TestImageUpload from "./components/Test/TestImageUpload";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login2" element={<UserLogin />} />
          <Route path="/register" element={<LoginSignUpPopup />} />
          <Route path="/register2" element={<UserRegistration />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/test" element={<TestImageUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
