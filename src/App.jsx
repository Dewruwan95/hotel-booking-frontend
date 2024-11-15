import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/clientPages/home/HomePage";
import AdminDashboard from "./pages/adminPages/dashboard/AdminDashboard";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import LoginSignUpPopup from "./components/userLoginAndRegister/LoginSignUpPopup";

function App() {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  function openLoginPopup() {
    setIsLoginClicked(true);
  }

  function closeLoginPopup() {
    setIsLoginClicked(false);
  }

  function handleUserLogedIn() {
    setIsUserLoggedIn(true);
    setIsLoginClicked(false);
  }

  function handleUserLogedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    localStorage.removeItem("activeNavItem");
    localStorage.removeItem("pendingBookingData");
    setIsUserLoggedIn(false);
    toast.success("Logged Out Successfully");
    navigate("/");
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
      <Routes path="/*">
        <Route
          path="/admin/*"
          element={
            <AdminDashboard
              isUserLoggedIn={isUserLoggedIn}
              handleUserLogedIn={handleUserLogedIn}
              handleUserLogedOut={handleUserLogedOut}
            />
          }
        />
        <Route
          path="/*"
          element={
            <HomePage
              openLoginPopup={openLoginPopup}
              handleUserLogedOut={handleUserLogedOut}
              isUserLoggedIn={isUserLoggedIn}
              handleUserLogedIn={handleUserLogedIn}
            />
          }
        />
        <Route path="/login" element={<LoginSignUpPopup />}></Route>
      </Routes>
      {isLoginClicked && (
        <LoginSignUpPopup
          closeLoginPopup={closeLoginPopup}
          handleUserLogedIn={handleUserLogedIn}
        />
      )}
    </>
  );
}

export default App;
