import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";

function AdminRooms() {
  const [roomsData, setRoomsData] = useState([]);
  const [isRoomsDataLoaded, setIsRoomsDataLoaded] = useState(false);

  useEffect(() => {
    if (!isRoomsDataLoaded) {
      fetchRoomsData();
    }
  }, [isRoomsDataLoaded]);

  // fetch rooms data function
  async function fetchRoomsData() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms`
      );
      setRoomsData(res.data.rooms);
      setIsRoomsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching rooms data:", error);
    }
  }

  // room delete function
  async function handleDelete(roomNo) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Room ${roomNo}?`
    );
    if (confirmDelete) {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsRoomsDataLoaded(false);
      } catch (error) {
        console.error("Failed to delete room:", error);
        alert("Failed to delete room. Please try again.");
      }
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
