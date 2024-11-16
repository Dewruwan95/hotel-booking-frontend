import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [isBookingsDataLoaded, setIsBookingsDataLoaded] = useState(false);

  useEffect(() => {
    if (!isBookingsDataLoaded) {
      fetchBookingsData();
    }
  }, [isBookingsDataLoaded]);

  // fetch bookings data function
  async function fetchBookingsData() {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setBookings(res.data.bookings);
      setIsBookingsDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  }

  //booking delete function
  async function handleDelete(bookingId) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Booking ${bookingId}?`
    );
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(
          import.meta.env.VITE_BACKEND_URL + "/api/bookings/" + bookingId,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsBookingsDataLoaded(false);
      } catch (error) {
        console.error("Failed to delete booking:", error);
        alert("Failed to delete booking. Please try again.");
      }
    }
  }

  // Column headers for Booking table
  const bookingColumns = [
    "Timestamp",
    "Booking ID",
    "Room ID",
    "Email",
    "Reason",
    "Start Date",
    "End Date",
    "Status",
    "Action",
  ];

  // Fields corresponding to the columns
  const bookingFields = [
    "timestamp",
    "bookingId",
    "roomId",
    "email",
    "reason",
    "start",
    "end",
    "status",
  ];
  return (
    <>
      <DataTable
        columns={bookingColumns}
        fields={bookingFields}
        data={bookings}
        deleteElement={handleDelete}
        editElementPath={"/admin/update-booking"}
        elementIdentifier={"bookingId"}
      />
    </>
  );
}

export default AdminBooking;
