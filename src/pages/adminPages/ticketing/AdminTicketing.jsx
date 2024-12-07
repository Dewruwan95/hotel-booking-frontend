import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import DataPagination from "../../../components/pagination/DataPagination";
import AdminDataSummary from "../../../components/adminDashboard/adminDataSummary/AdminDataSummary";

function AdminTicketing() {
  const [tickets, setTickets] = useState([]);
  const [ticketsSummary, setTicketsSummary] = useState([]);
  const [isTicketsDataLoaded, setIsTicketsDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!isTicketsDataLoaded) {
      fetchTicketsData();
    }
  }, [isTicketsDataLoaded]);

  useEffect(() => {
    fetchTicketsData();
  }, [page, pageSize]);

  // Fetch tickets data function
  async function fetchTicketsData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/inquiries/all",
        { page: page, pageSize: pageSize },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setTickets(res.data.inquiries);
      setTicketsSummary(res.data.inquiriesSummary);
      setTotalPages(res.data.pagination.totalPages);
      setIsTicketsDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  }

  // Ticket delete function
  async function handleDelete(ticketId) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsTicketsDataLoaded(false);
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      alert("Failed to delete ticket. Please try again.");
    }
  }

  // Column headers for Ticket table
  const ticketColumns = [
    "Timestamp",
    "Type",
    "Name",
    "Email",
    "Message",
    "Status",
    "Action",
  ];

  // Fields corresponding to the columns
  const ticketFields = [
    "timestamp",
    "inquiryType",
    "name",
    "email",
    "message",
    "status",
  ];

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="h-[17%]">
          <AdminDataSummary ticketsSummary={ticketsSummary} />
        </div>
        <div className="h-full overflow-y-auto">
          <DataTable
            columns={ticketColumns}
            fields={ticketFields}
            data={tickets}
            deleteElement={handleDelete}
            editElementPath={"/admin/update-ticket"}
            elementIdentifier={"_id"}
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

export default AdminTicketing;
