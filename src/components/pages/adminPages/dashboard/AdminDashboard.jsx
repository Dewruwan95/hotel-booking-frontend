import { Route, Routes } from "react-router-dom";
import AdminBooking from "../booking/AdminBooking";
import AdminRooms from "../rooms/AdminRooms";
import AdminCategories from "../categories/AdminCategories";
import AdminUsers from "../users/AdminUsers";
import AdminFeedback from "../feedbacks/AdminFeedback";
import AdminTicketing from "../ticketing/AdminTicketing";
import AdminGallery from "../gallery/AdminGallery";
import NotFoundPage from "../../clientPages/notFound/NotFoundPage";

function AdminDashboard() {
  return (
    <div className="w-full h-[200px] bg-blue-700">
      <h1>Dashboard</h1>
      <Routes path="/*">
        <Route path="/booking" element={<AdminBooking />} />
        <Route path="/rooms" element={<AdminRooms />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/feedback" element={<AdminFeedback />} />
        <Route path="/ticketing" element={<AdminTicketing />} />
        <Route path="/gallery" element={<AdminGallery />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
