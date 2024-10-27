import { Route, Routes } from "react-router-dom";
import AdminBooking from "../booking/AdminBooking";
import AdminRooms from "../rooms/AdminRooms";
import AdminCategories from "../categories/AdminCategories";
import AdminUsers from "../users/AdminUsers";
import AdminFeedback from "../feedbacks/AdminFeedback";
import AdminTicketing from "../ticketing/AdminTicketing";
import AdminGallery from "../gallery/AdminGallery";
import NavigationItemList from "../../../components/adminNavigation/NavigationItemList";
import DateAndTime from "../../../components/adminDashboardTimestamp/DateAndTime";
import AdminDashboardProfile from "../../../components/adminDashboardProfile/AdminDashboardProfile";
import { useState } from "react";
import { TbLogout2 } from "react-icons/tb";

function AdminDashboard() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  function handleUserLogedIn() {
    setIsUserLoggedIn(true);
  }
  function handleUserLogedOut() {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
    window.location.href = "/";
  }

  return (
    <>
      <div className="w-full max-h-[100vh] bg-purple-900 flex">
        <div className="w-[20%] h-[100vh] bg-purple-300 flex flex-col">
          <div className="h-[30%] max-h[30%] bg-purple-900">
            <div className="h-[80%] max-h-[80%]">
              {/* dashboard profile design */}
              <AdminDashboardProfile userLogedIn={handleUserLogedIn} />
            </div>
            <div className="h-[20%] max-h-[20%] bg-white">
              {/* dashboard settings design */}
            </div>
          </div>
          <div>
            {/* dashboard navigation design */}
            <NavigationItemList />
          </div>
        </div>

        {/* dashboard top bar design */}
        <div className="w-[80%] h-[100vh]">
          <div className="h-[6%] w-[100%] bg-purple-900 flex">
            {/* timestabp area */}
            <div className="w-[80%] max-w[80%] h-[100%] flex items-center justify-center">
              <DateAndTime />
            </div>
            {/* logout button area */}
            <div className="w-[20%] max-w[20%] h-[100%] flex items-center justify-center">
              {isUserLoggedIn && (
                <button
                  className="text-white bg-purple-500 px-6 py-1 rounded-2xl text-lg font-semibold flex items-center hover:bg-purple-600"
                  onClick={handleUserLogedOut}
                >
                  <TbLogout2 className="text-[25px] mr-1" />
                  Log Out
                </button>
              )}
            </div>
          </div>

          <div className="h-[94%] rounded-tl-[10px] bg-purple-200">
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
