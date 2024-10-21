import { Route, Routes } from "react-router-dom";
import AdminBooking from "../booking/AdminBooking";
import AdminRooms from "../rooms/AdminRooms";
import AdminCategories from "../categories/AdminCategories";
import AdminUsers from "../users/AdminUsers";
import AdminFeedback from "../feedbacks/AdminFeedback";
import AdminTicketing from "../ticketing/AdminTicketing";
import AdminGallery from "../gallery/AdminGallery";
import NavigationItemList from "./NavigationItemList";

function AdminDashboard() {
  return (
    <>
      {/* dashboard navigation design */}
      <div className="w-full max-h-[100vh] flex">
        <div className="w-[20%] h-[100vh] bg-purple-300 flex flex-col">
          <NavigationItemList />
        </div>

        <div className="w-[80%]  bg-purple-100">
          <Routes path="/*">
            <Route path="/booking" element={<AdminBooking />} />
            <Route path="/rooms" element={<AdminRooms />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/feedback" element={<AdminFeedback />} />
            <Route path="/ticketing" element={<AdminTicketing />} />
            <Route path="/gallery" element={<AdminGallery />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
