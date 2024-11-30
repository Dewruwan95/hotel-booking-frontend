import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import toast from "react-hot-toast";
import DataPagination from "../../../components/pagination/DataPagination";

function AdminFeedback() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isFeedbacksDataLoaded, setIsFeedbacksDataLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (!isFeedbacksDataLoaded) {
      fetchFeedbackData();
    }
  }, [isFeedbacksDataLoaded]);

  useEffect(() => {
    fetchFeedbackData();
  }, [page, pageSize]);

  // fetch feedback data function
  async function fetchFeedbackData() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/feedbacks/all",
        { page: page, pageSize: pageSize },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedbackData(res.data.feedbacks);
      setTotalPages(res.data.pagination.totalPages);
      setIsFeedbacksDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  }

  // feedback delete function
  async function handleDelete(feedbackId) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/feedbacks/" + feedbackId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Feedback Deleted Successfully");
      setIsFeedbacksDataLoaded(false);
    } catch (error) {
      toast.error("Failed to delete feedback. Please try again.");
      console.error("Failed to delete feedback:", error);
    }
  }

  // Column headers for Room table
  const feedbackColumns = [
    "Date",
    "Name",
    "Email",
    "Title",
    "Description",
    "Rating",
    "Status",
    "Action",
  ];

  // Fields corresponding to the columns
  const feedbackFields = [
    "timestamp",
    "name",
    "email",
    "title",
    "description",
    "rating",
    "approved",
  ];
  return (
    <>
      <DataTable
        columns={feedbackColumns}
        fields={feedbackFields}
        data={feedbackData}
        deleteElement={handleDelete}
        editElementPath="/admin/update-feedback"
        elementIdentifier="_id"
      />

      <DataPagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}

export default AdminFeedback;
