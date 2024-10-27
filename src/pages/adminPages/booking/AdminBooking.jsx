import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import { bookings } from "../../../data/BookingsData";
function AdminBooking() {
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
      />
    </>
  );
}

export default AdminBooking;
