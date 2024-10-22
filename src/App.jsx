import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/clientPages/home/HomePage";
import AdminDashboard from "./pages/adminPages/dashboard/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
