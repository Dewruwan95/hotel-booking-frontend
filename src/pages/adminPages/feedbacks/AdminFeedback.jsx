import DataTable from "../../../components/adminDataTable/DataTable";
import { feedback } from "../../../data/FeedbackData";

function AdminFeedback() {
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
        data={feedback}
      />
    </>
  );
}

export default AdminFeedback;
