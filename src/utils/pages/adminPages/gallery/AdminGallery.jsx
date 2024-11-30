import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import AdminDataSummary from "../../../components/adminDashboard/adminDataSummary/AdminDataSummary";
import { useNavigate } from "react-router-dom";
import DataPagination from "../../../components/pagination/DataPagination";

function AdminGallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [isGalleryDataLoaded, setIsGalleryDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isGalleryDataLoaded) {
      fetchGalleryData();
    }
  }, [isGalleryDataLoaded]);

  useEffect(() => {
    fetchGalleryData();
  }, [page, pageSize]);

  // fetch gallery data function
  async function fetchGalleryData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/events/all",
        { page: page, pageSize: pageSize },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setGalleryData(res.data.events);
      setTotalPages(res.data.pagination.totalPages);
      setIsGalleryDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  // event delete function
  async function handleDelete(eventId) {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsGalleryDataLoaded(false);
    } catch (error) {
      console.log("Failed to delete event:", error);
      alert("Failed to delete event. Please try again.");
    }
  }

  // Column headers for Gallery table
  const galleryColumns = ["Image", "Event Name", "Description", "Action"];

  // Fields corresponding to the columns
  const galleryFields = ["image", "name", "description"];
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="h-[17%]">
          <AdminDataSummary
            onAddElementClick={() => {
              navigate("/admin/add-event");
            }}
          />
        </div>
        <div className="h-full overflow-y-auto">
          <DataTable
            columns={galleryColumns}
            fields={galleryFields}
            data={galleryData}
            deleteElement={handleDelete}
            editElementPath={"/admin/update-event"}
            elementIdentifier="_id"
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

export default AdminGallery;
