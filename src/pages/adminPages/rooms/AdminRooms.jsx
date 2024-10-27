import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";

function AdminRooms() {
  const [roomsData, setRoomsData] = useState([]);
  const [isRoomsDataLoaded, setIsRoomsDataLoaded] = useState(false);

  useEffect(() => {
    if (!isRoomsDataLoaded) {
      //get rooms data from backend
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms")
        .then((res) => {
          setRoomsData(res.data.rooms);
          setIsRoomsDataLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isRoomsDataLoaded]);

  // room delete function
  function handleDelete(roomNo) {
    if (window.confirm(`Are you sure you want to delete Room ${roomNo}?`)) {
      const token = localStorage.getItem("token");
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomNo}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setIsRoomsDataLoaded(false);
        })
        .catch((error) => {
          console.error("Failed to delete room:", error);
          alert("Failed to delete room. Please try again.");
        });
    }
  }

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
      <DataTable
        columns={roomColumns}
        fields={roomFields}
        data={roomsData}
        deleteElement={handleDelete}
        elementIdentifier={"roomNo"}
      />
    </>
  );
}

export default AdminRooms;
