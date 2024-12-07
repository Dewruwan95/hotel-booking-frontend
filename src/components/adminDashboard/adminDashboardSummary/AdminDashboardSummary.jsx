import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

function AdminDashboardSummary() {
  const [ongoingBookings, setOngoingBookings] = useState([]);
  const [bookingsSummary, setBookingsSummary] = useState([]);
  const [groupedBookings, setGroupedBookings] = useState([]);
  const [isBookingsDataLoaded, setIsBookingsDataLoaded] = useState(false);

  const [roomsSummary, setRoomsSummary] = useState([]);
  const [isRoomsDataLoaded, setIsRoomsDataLoaded] = useState(false);

  const [usersSummary, setUsersSummary] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  const [feedbackSummary, setFeedbackSummary] = useState([]);
  const [isFeedbacksDataLoaded, setIsFeedbacksDataLoaded] = useState(false);

  const [ticketsSummary, setTicketsSummary] = useState([]);
  const [isTicketsDataLoaded, setIsTicketsDataLoaded] = useState(false);

  const [categoriesSummary, setCategoriesSummary] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);

  const [gallerySummary, setGallerySummary] = useState([]);
  const [isGalleryDataLoaded, setIsGalleryDataLoaded] = useState(false);

  useEffect(() => {
    if (!isBookingsDataLoaded) {
      fetchBookingsData();
    }
  }, [isBookingsDataLoaded]);

  useEffect(() => {
    if (!isRoomsDataLoaded) {
      fetchRoomsData();
    }
  }, [isRoomsDataLoaded]);

  useEffect(() => {
    if (!isUsersLoaded) {
      fetchUsersData();
    }
  }, [isUsersLoaded]);

  useEffect(() => {
    if (ongoingBookings.length > 0) {
      groupBookingsByDate(ongoingBookings);
    }
  }, [ongoingBookings]);

  useEffect(() => {
    if (!isFeedbacksDataLoaded) {
      fetchFeedbackData();
    }
  }, [isFeedbacksDataLoaded]);

  useEffect(() => {
    if (!isTicketsDataLoaded) {
      fetchTicketsData();
    }
  }, [isTicketsDataLoaded]);

  useEffect(() => {
    if (!isCategoriesLoaded) {
      fetchCategoriesData();
    }
  }, [isCategoriesLoaded]);

  useEffect(() => {
    if (!isGalleryDataLoaded) {
      fetchGalleryData();
    }
  }, [isGalleryDataLoaded]);

  // fetch bookings data function
  async function fetchBookingsData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/dashboard-bookings",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setOngoingBookings(res.data.ongoingBookings);
      setBookingsSummary(res.data.bookingsSummary);

      setIsBookingsDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  }

  // Group bookings by date
  function groupBookingsByDate(bookings) {
    const bookingsByDate = bookings.reduce((acc, booking) => {
      const dateKey = new Date(booking.start).toISOString().split("T")[0];
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    // Convert object to array of objects in the required format
    const groupedBookingsArray = Object.entries(bookingsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

    setGroupedBookings(groupedBookingsArray);
  }

  // fetch rooms data function
  async function fetchRoomsData() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/all`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setRoomsSummary(res.data.roomsSummary);

      setIsRoomsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching rooms data:", error);
    }
  }

  // fetch users data function
  async function fetchUsersData() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsersSummary(res.data.usersSummary);
      setIsUsersLoaded(true);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  // fetch feedback data function
  async function fetchFeedbackData() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/feedbacks/all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedbackSummary(res.data.feedbacksSummary);

      setIsFeedbacksDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  }

  // Fetch tickets data function
  async function fetchTicketsData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/inquiries/all",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setTicketsSummary(res.data.inquiriesSummary);

      setIsTicketsDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  }

  // fetch categories data function
  async function fetchCategoriesData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/categories/all",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setCategoriesSummary(res.data.categoriesSymmary);

      setIsCategoriesLoaded(true);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // fetch gallery data function
  async function fetchGalleryData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/events/all",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setGallerySummary(res.data.eventsSummary);

      setIsGalleryDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  return (
    <>
      <div className="flex w-full">
        {/* Left Column (50% width) */}
        <div className="w-[50%] p-[20px]">
          <div className="bg-purple-400 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Bookings</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 text-yellow-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {bookingsSummary.totalPendingBookings}
                </span>
                <span className="ml-2 ">Pending</span>
              </div>
              <div className="bg-gray-100 text-green-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {ongoingBookings.length}
                </span>
                <span className="ml-2 ">Confirmed</span>
              </div>
              <div className="bg-gray-100 text-red-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {bookingsSummary.totalCanceledBookings}
                </span>
                <span className="ml-2 ">Canceled</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-400 rounded-lg shadow-md mt-[20px] p-6">
            <h2 className="text-2xl font-bold mb-4">Ongoing Bookings</h2>
            <div className="grid grid-cols-1 gap-4">
              {groupedBookings.map((booking, index) => (
                <div
                  key={index}
                  className="bg-gray-100 text-purple-800 rounded-lg p-1 flex items-center justify-center text-2xl font-bold"
                >
                  <div className="grid grid-cols-[70%,30%] w-full items-center text-center">
                    <span className="flex justify-center w-full">
                      {format(new Date(booking.date), "yyyy MMMM dd")}
                    </span>

                    <span className="flex justify-center w-full">
                      {booking.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (50% width) */}
        <div className="w-[50%] p-[20px]">
          {/* Feedbacks summary */}
          <div className="bg-purple-400 rounded-lg shadow-md  p-6">
            <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 text-purple-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {feedbackSummary.totalFeedbacks}
                </span>
                <span className="ml-2 ">Total</span>
              </div>
              <div className="bg-gray-100 text-yellow-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {feedbackSummary.totalPendingFeedbacks}
                </span>
                <span className="ml-2 ">Pending</span>
              </div>
              <div className="bg-gray-100 text-green-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {feedbackSummary.totalVerifiedFeedbacks}
                </span>
                <span className="ml-2 ">Verified</span>
              </div>
            </div>
          </div>

          {/* inquiry summary */}
          <div className="bg-purple-400 rounded-lg shadow-md mt-[20px] p-6">
            <h2 className="text-2xl font-bold mb-4">Inquiries</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 text-purple-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {ticketsSummary.totalInquiries}
                </span>
                <span className="ml-2 ">Total</span>
              </div>
              <div className="bg-gray-100 text-yellow-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {ticketsSummary.totalPendingInquiries}
                </span>
                <span className="ml-2 ">Pending</span>
              </div>
              <div className="bg-gray-100 text-green-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {ticketsSummary.totalResolvedInquiries}
                </span>
                <span className="ml-2 ">Resolved</span>
              </div>
            </div>
          </div>

          {/* rooms summary */}
          <div className="bg-purple-400 rounded-lg shadow-md p-6 mt-[20px]">
            <h2 className="text-2xl font-bold mb-4">Rooms</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 text-purple-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {roomsSummary.totalRooms}
                </span>
                <span className="ml-2 ">Total</span>
              </div>
              <div className="bg-gray-100 text-green-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {roomsSummary.availableRooms}
                </span>
                <span className="ml-2 ">Available</span>
              </div>
              <div className="bg-gray-100 text-red-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {roomsSummary.notAvailableRooms}
                </span>
                <span className="ml-2 ">Disabled</span>
              </div>
            </div>
          </div>

          {/* users summary */}
          <div className="bg-purple-400 rounded-lg shadow-md mt-[20px] p-6">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-100 text-purple-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {usersSummary.totalUsers}
                </span>
                <span className="ml-2 ">Total</span>
              </div>
              <div className="bg-gray-100 text-green-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {usersSummary.totalActiveUsers}
                </span>
                <span className="ml-2 ">Active</span>
              </div>
              <div className="bg-gray-100 text-red-500 rounded-lg p-4 flex items-center justify-center">
                <span className="text-4xl font-bold">
                  {usersSummary.totalBannedUsers}
                </span>
                <span className="ml-2 ">Banned</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[50%,50%] w-full ">
            {/* categories summary */}
            <div className="bg-purple-400 rounded-lg shadow-md mt-[20px] mr-[10px] p-6">
              <h2 className="text-2xl font-bold mb-4">Categories</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-100 text-purple-500 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {categoriesSummary.totalCategories}
                  </span>
                  <span className="ml-2 ">Total</span>
                </div>
              </div>
            </div>

            {/* events summary */}
            <div className="bg-purple-400 rounded-lg shadow-md mt-[20px] ml-[10px] p-6">
              <h2 className="text-2xl font-bold mb-4">Events</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-100 text-purple-500 rounded-lg p-4 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {gallerySummary.totalEvents}
                  </span>
                  <span className="ml-2 ">Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardSummary;
