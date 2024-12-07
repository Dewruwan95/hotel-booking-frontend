import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDataSummary from "../../../components/adminDashboard/adminDataSummary/AdminDataSummary";
import DataPagination from "../../../components/pagination/DataPagination";

function AdminRooms() {
  const [roomsData, setRoomsData] = useState([]);
  const [roomsSummary, setRoomsSummary] = useState([]);
  const [isRoomsDataLoaded, setIsRoomsDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isRoomsDataLoaded) {
      fetchRoomsData();
    }
  }, [isRoomsDataLoaded]);

  useEffect(() => {
    fetchRoomsData();
  }, [page, pageSize]);

  // fetch rooms data function
  async function fetchRoomsData() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/all`,
        { page: page, pageSize: pageSize },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRoomsData(res.data.rooms);
      setRoomsSummary(res.data.roomsSummary);
      setTotalPages(res.data.pagination.totalPages);
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
        <div className="h-[17%]">
          <AdminDataSummary
            onAddElementClick={() => {
              navigate("/admin/add-room");
            }}
            roomsSummary={roomsSummary}
          />
        </div>
        <div className="h-full overflow-y-auto">
          <DataTable
            columns={roomColumns}
            fields={roomFields}
            data={roomsData}
            deleteElement={handleDelete}
            editElementPath={"/admin/update-room"}
            elementIdentifier={"roomNo"}
          />

          <DataPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </>
  );
}

export default AdminRooms;
