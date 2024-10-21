import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/clientPages/home/HomePage";
import AdminDashboard from "./components/pages/adminPages/dashboard/AdminDashboard";

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
