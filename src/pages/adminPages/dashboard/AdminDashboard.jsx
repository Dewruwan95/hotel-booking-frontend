import { Route, Routes } from "react-router-dom";
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
import { TbLogout2 } from "react-icons/tb";
import AdminDashboardOptions from "../../../components/adminDashboard/adminDashboardOptions/AdminDashboardOptions";
import AddCategoryForm from "../../../components/adminDashboard/adminCreateNewElement/createNewCategoryForm/AddCategoryForm";
import UpdateCategoryForm from "../../../components/adminDashboard/adminUpdateElement/updateCategoryForm/UpdateCategoryForm";
import AddEventForm from "../../../components/adminDashboard/adminCreateNewElement/ctreateNewEventForm/AddEventForm";
import UpdateEventForm from "../../../components/adminDashboard/adminUpdateElement/updateEventForm/UpdateEventForm";
import UpdateFeedbackForm from "../../../components/adminDashboard/adminUpdateElement/updateFeedbackForm/UpdateFeedbackForm";
import UpdateUserForm from "../../../components/adminDashboard/adminUpdateElement/updateUserForm/UpdateUserForm";
import UpdateRoomForm from "../../../components/adminDashboard/adminUpdateElement/updateRoomForm/UpdateRoomForm";
import AddRoomForm from "../../../components/adminDashboard/adminCreateNewElement/createNewRoomForm/AddRoomForm";
import UpdateBookingForm from "../../../components/adminDashboard/adminUpdateElement/updateBookingForm/UpdateBookingForm";
import UpdateTicketForm from "../../../components/adminDashboard/adminUpdateElement/updateTicketForm/UpdateTicketForm";
import AdminDashboardSummary from "../../../components/adminDashboard/adminDashboardSummary/AdminDashboardSummary";

function AdminDashboard({
  isUserLoggedIn,
  handleUserLogedIn,
  handleUserLogedOut,
}) {
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
                  <Route
                    path="/dashboard"
                    element={<AdminDashboardSummary />}
                  />
                  <Route path="/bookings" element={<AdminBooking />} />
                  <Route
                    path="/update-booking"
                    element={<UpdateBookingForm />}
                  />

                  <Route path="/rooms" element={<AdminRooms />} />
                  <Route path="/add-room" element={<AddRoomForm />} />
                  <Route path="/update-room" element={<UpdateRoomForm />} />

                  <Route path="/categories" element={<AdminCategories />} />
                  <Route path="/add-category" element={<AddCategoryForm />} />
                  <Route
                    path="/update-category"
                    element={<UpdateCategoryForm />}
                  />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/update-user" element={<UpdateUserForm />} />

                  <Route path="/feedbacks" element={<AdminFeedback />} />
                  <Route
                    path="update-feedback"
                    element={<UpdateFeedbackForm />}
                  />

                  <Route path="/ticketing" element={<AdminTicketing />} />
                  <Route path="/update-ticket" element={<UpdateTicketForm />} />

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
