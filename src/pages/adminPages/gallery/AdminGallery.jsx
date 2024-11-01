import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";

function AdminGallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [isGalleryDataLoaded, setIsGalleryDataLoaded] = useState(false);

  useEffect(() => {
    if (!isGalleryDataLoaded) {
      fetchGalleryData();
    }
  }, [isGalleryDataLoaded]);

  // fetch gallery data function
  async function fetchGalleryData() {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/events"
      );
      setGalleryData(res.data.events);
      setIsGalleryDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  // event delete function
  async function handleDelete(eventId) {
    if (window.confirm(`Are you sure you want to delete Event ${eventId}?`)) {
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
  }

  // Column headers for Gallery table
  const galleryColumns = ["Event ID", "Event Name", "Description", "Action"];

  // Fields corresponding to the columns
  const galleryFields = ["eventId", "name", "description"];
  return (
    <>
      <DataTable
        columns={galleryColumns}
        fields={galleryFields}
        data={galleryData}
        deleteElement={handleDelete}
        elementIdentifier="eventId"
      />
    </>
  );
}

export default AdminGallery;
