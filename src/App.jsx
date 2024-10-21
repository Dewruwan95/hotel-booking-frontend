import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/clientPages/home/HomePage";
import Dashboard from "./components/pages/adminPages/dashboard/AdminDashboard";
import NotFoundPage from "./components/pages/clientPages/notFound/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
