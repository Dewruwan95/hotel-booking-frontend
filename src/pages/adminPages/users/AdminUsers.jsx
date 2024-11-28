import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import DataPagination from "../../../components/pagination/DataPagination";

function AdminUsers() {
  const [usersData, setUsersData] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (!isUsersLoaded) {
      fetchUsersData();
    }
  }, [isUsersLoaded]);

  useEffect(() => {
    fetchUsersData();
  }, [page, pageSize]);

  // fetch users data function
  async function fetchUsersData() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/all",
        { page: page, pageSize: pageSize },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsersData(res.data.users);
      setTotalPages(res.data.pagination.totalPages);
      setIsUsersLoaded(true);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  // user delete function
  async function handleDelete(email) {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsUsersLoaded(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
  }

  // Column headers for User table
  const userColumns = [
    "Image",
    "Name",
    "Email",
    "Phone",
    "WhatsApp",
    "Type",
    "Verification",
    "Status",
    "Action",
  ];

  // Fields corresponding to the columns
  const userFields = [
    "image",
    "firstName",
    "email",
    "phone",
    "whatsApp",
    "type",
    "emailVerify",
    "disabled",
  ];
  return (
    <>
      <DataTable
        columns={userColumns}
        fields={userFields}
        data={usersData}
        deleteElement={handleDelete}
        editElementPath={"/admin/update-user"}
        elementIdentifier={"email"}
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

export default AdminUsers;
