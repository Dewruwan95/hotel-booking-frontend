import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import DataPagination from "../../../components/pagination/DataPagination";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [isBookingsDataLoaded, setIsBookingsDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!isBookingsDataLoaded) {
      fetchBookingsData();
    }
  }, [isBookingsDataLoaded]);

  useEffect(() => {
    fetchBookingsData();
  }, [page, pageSize]);

  // fetch bookings data function
  async function fetchBookingsData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/all",
        { page: page, pageSize: pageSize },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setBookings(res.data.bookings);
      setTotalPages(res.data.pagination.totalPages);
      setIsBookingsDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  }

  //booking delete function
  async function handleDelete(bookingId) {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
        { isDeleted: true },

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

      <DataPagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}

export default AdminBooking;
