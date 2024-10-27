import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";

function AdminCategories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);

  useEffect(() => {
    if (!isCategoriesLoaded) {
      //get categories data from backend
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/categories")
        .then((res) => {
          setCategoriesData(res.data.categories);
          setIsCategoriesLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isCategoriesLoaded]);

  // category delete function
  function handleDelete(name) {
    if (window.confirm(`Are you sure you want to delete Category ${name}?`)) {
      const token = localStorage.getItem("token");
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${name}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setIsCategoriesLoaded(false);
        })
        .catch((error) => {
          console.error("Failed to delete category:", error);
          alert("Failed to delete category. Please try again.");
        });
    }
  }
  // Column headers for Room table
  const categoryColumns = [
    "Name",
    "Price (Rs.)",
    "Features",
    "Description",
    "Action",
  ];

  // Fields corresponding to the columns
  const categoryFields = ["name", "price", "features", "description"];
  return (
    <>
      <DataTable
        columns={categoryColumns}
        fields={categoryFields}
        data={categoriesData}
        deleteElement={handleDelete}
        elementIdentifier={"name"}
      />
    </>
  );
}

export default AdminCategories;
