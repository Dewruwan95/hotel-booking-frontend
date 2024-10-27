import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import { users } from "../../../data/UsersData";
function AdminUsers() {
  // Column headers for User table
  const userColumns = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "WhatsApp",
    "Action",
  ];

  // Fields corresponding to the columns
  const userFields = ["firstName", "lastName", "email", "phone", "whatsApp"];
  return (
    <>
      <DataTable columns={userColumns} fields={userFields} data={users} />
    </>
  );
}

export default AdminUsers;
