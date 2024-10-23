import DataTable from "../../../components/adminDataTable/DataTable";
import { rooms } from "../../../data/RoomsData";
function AdminRooms() {
  // Column headers for Room table
  const roomColumns = [
    "Room No",
    "Category",
    "Max Guests",
    "Special Desc",
    "Notes",
    "Availability",
    "Action",
  ];

  // Fields corresponding to the columns
  const roomFields = [
    "roomNo",
    "category",
    "maxGuests",
    "specialDescription",
    "notes",
    "available",
  ];
  return (
    <>
      <DataTable columns={roomColumns} fields={roomFields} data={rooms} />
    </>
  );
}

export default AdminRooms;
