import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDataSummary from "../../../components/adminDashboard/adminDataSummary/AdminDataSummary";

function AdminRooms() {
  const [roomsData, setRoomsData] = useState([]);
  const [isRoomsDataLoaded, setIsRoomsDataLoaded] = useState(false);

  const navigate = useNavigate();

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
      console.log("Failed to delete room:", error);
      alert("Failed to delete room. Please try again.");
    }
  }

  // Column headers for Room table
  const roomColumns = [
    "Image",
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
    "photos",
    "roomNo",
    "category",
    "maxGuests",
    "specialDescription",
    "notes",
    "available",
  ];
  return (
    <>
      <div className="h-full flex flex-col">
        <AdminDataSummary
          onAddElementClick={() => {
            navigate("/admin/add-room");
          }}
        />
        <div className="overflow-y-auto">
          <DataTable
            columns={roomColumns}
            fields={roomFields}
            data={roomsData}
            deleteElement={handleDelete}
            editElementPath={"/admin/update-room"}
            elementIdentifier={"roomNo"}
          />
        </div>
      </div>
    </>
  );
}

export default AdminRooms;
