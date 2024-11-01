import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";

function AdminFeedback() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isFeedbacksDataLoaded, setIsFeedbacksDataLoaded] = useState(false);

  useEffect(() => {
    if (!isFeedbacksDataLoaded) {
      fetchFeedbackData();
    }
  }, [isFeedbacksDataLoaded]);

  // fetch feedback data function
  async function fetchFeedbackData() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/feedbacks",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedbackData(res.data.feedbacks);
      setIsFeedbacksDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  }

  // feedback delete function
  async function handleDelete(feedbackId) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Feedback ${feedbackId}?`
    );
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(
          import.meta.env.VITE_BACKEND_URL + `/api/feedbacks/${feedbackId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFeedbacksDataLoaded(false);
      } catch (error) {
        console.error("Failed to delete feedback:", error);
        alert("Failed to delete feedback. Please try again.");
      }
    }
  }

  // Column headers for Room table
  const feedbackColumns = [
    "Date",
    "Feedback ID",
    "Name",
    "Email",
    "Title",
    "Rating",
    "Status",
    "Action",
  ];

  // Fields corresponding to the columns
  const feedbackFields = [
    "timestamp",
    "feedbackId",
    "firstName",
    "email",
    "title",
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
        elementIdentifier="feedbackId"
      />
    </>
  );
}

export default AdminFeedback;
