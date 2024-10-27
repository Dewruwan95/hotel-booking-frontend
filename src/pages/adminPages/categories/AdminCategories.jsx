import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";

function AdminCategories() {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    //get categories data from backend
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/categories")
      .then((res) => {
        setCategoriesData(res.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      />
    </>
  );
}

export default AdminCategories;
