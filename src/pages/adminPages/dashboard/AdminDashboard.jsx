import { Route, Routes } from "react-router-dom";
import AdminBooking from "../booking/AdminBooking";
import AdminRooms from "../rooms/AdminRooms";
import AdminCategories from "../categories/AdminCategories";
import AdminUsers from "../users/AdminUsers";
import AdminFeedback from "../feedbacks/AdminFeedback";
import AdminTicketing from "../ticketing/AdminTicketing";
import AdminGallery from "../gallery/AdminGallery";
import NavigationItemList from "../../../components/adminNavigation/NavigationItemList";

function AdminDashboard() {
  return (
    <>
      <div className="w-full max-h-[100vh] bg-purple-900 flex">
        <div className="w-[20%] h-[100vh] bg-purple-300 flex flex-col">
          <div className="h-[30%] max-h[30%] bg-purple-900">
            {/* dashboard profile design */}
          </div>
          <div>
            {/* dashboard navigation design */}
            <NavigationItemList />
          </div>
        </div>

        <div className="w-[80%] h-[100vh]">
          <div className="h-[6%] bg-purple-900"></div>

          <div className="h-[94%] overflow-y-scroll rounded-tl-[10px] bg-purple-200">
            {/* dashboard content design */}
            <Routes path="/*">
              <Route path="/bookings" element={<AdminBooking />} />
              <Route path="/rooms" element={<AdminRooms />} />
              <Route path="/categories" element={<AdminCategories />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/feedbacks" element={<AdminFeedback />} />
              <Route path="/ticketing" element={<AdminTicketing />} />
              <Route path="/gallery" element={<AdminGallery />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
