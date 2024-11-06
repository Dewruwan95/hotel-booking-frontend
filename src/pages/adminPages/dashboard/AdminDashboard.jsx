import { Route, Routes, useNavigate } from "react-router-dom";
import AdminBooking from "../booking/AdminBooking";
import AdminRooms from "../rooms/AdminRooms";
import AdminCategories from "../categories/AdminCategories";
import AdminUsers from "../users/AdminUsers";
import AdminFeedback from "../feedbacks/AdminFeedback";
import AdminTicketing from "../ticketing/AdminTicketing";
import AdminGallery from "../gallery/AdminGallery";
import NavigationItemList from "../../../components/adminDashboard/adminNavigation/NavigationItemList";
import DateAndTime from "../../../components/adminDashboard/adminDashboardTimestamp/DateAndTime";
import AdminDashboardProfile from "../../../components/adminDashboard/adminDashboardProfile/AdminDashboardProfile";
import { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import AdminDashboardOptions from "../../../components/adminDashboard/adminDashboardOptions/AdminDashboardOptions";
import AddCategoryForm from "../../../components/adminDashboard/adminCreateNewElement/createNewCategoryForm/AddCategoryForm";
import toast from "react-hot-toast";
import UpdateCategoryForm from "../../../components/adminDashboard/adminUpdateElement/updateCategoryForm/UpdateCategoryForm";
import AddEventForm from "../../../components/adminDashboard/adminCreateNewElement/ctreateNewEventForm/AddEventForm";
import UpdateEventForm from "../../../components/adminDashboard/adminUpdateElement/updateEventForm/UpdateEventForm";

function AdminDashboard() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  function handleUserLogedIn() {
    setIsUserLoggedIn(true);
  }
  function handleUserLogedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("activeNavItem");
    setIsUserLoggedIn(false);
    toast.success("Logged Out Successfully");
    navigate("/");
  }

  const userType = localStorage.getItem("userType");
  if (userType) {
    if (userType === "admin") {
      return (
        <>
          <div className="w-full max-h-[100vh] bg-purple-900 flex">
            <div className="w-[20%] h-[100vh] bg-purple-300 flex flex-col">
              <div className="h-[30%] max-h[30%] bg-purple-900">
                <div className="h-[80%] max-h-[80%]">
                  {/* dashboard profile design */}
                  <AdminDashboardProfile userLogedIn={handleUserLogedIn} />
                </div>
                <div className="h-[20%] max-h-[20%]">
                  {/* dashboard options design */}
                  <AdminDashboardOptions />
                </div>
              </div>
              <div>
                {/* dashboard navigation design */}
                <NavigationItemList />
              </div>
            </div>

            <div className="w-[80%] h-[100vh]">
              {/* dashboard top bar design */}
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

              {/* dashboard content design */}
              <div className="h-[94%] rounded-tl-[10px] bg-purple-200">
                <Routes path="/*">
                  <Route path="/bookings" element={<AdminBooking />} />
                  <Route path="/rooms" element={<AdminRooms />} />

                  <Route path="/categories" element={<AdminCategories />} />
                  <Route path="/add-category" element={<AddCategoryForm />} />
                  <Route
                    path="/update-category"
                    element={<UpdateCategoryForm />}
                  />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/feedbacks" element={<AdminFeedback />} />
                  <Route path="/ticketing" element={<AdminTicketing />} />

                  <Route path="/gallery" element={<AdminGallery />} />
                  <Route path="/add-event" element={<AddEventForm />} />
                  <Route path="/update-event" element={<UpdateEventForm />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      window.location.href = "/";
    }
  } else {
    window.location.href = "/";
  }
}

export default AdminDashboard;
