import DataTable from "../../../components/adminDataTable/DataTable";
import { bookings } from "../../../data/BookingsData";
function AdminBooking() {
  // Define the column headers as an array
  const columns = [
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
  return (
    <>
      <DataTable columns={columns} data={bookings} />
    </>
  );
}

export default AdminBooking;
