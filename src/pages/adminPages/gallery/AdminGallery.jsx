import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import { events } from "../../../data/EventData";

function AdminGallery() {
  // Column headers for Gallery table
  const galleryColumns = ["Event ID", "Event Name", "Description", "Action"];

  // Fields corresponding to the columns
  const galleryFields = ["eventId", "name", "description"];
  return (
    <>
      <DataTable
        columns={galleryColumns}
        fields={galleryFields}
        data={events}
      />
    </>
  );
}

export default AdminGallery;
