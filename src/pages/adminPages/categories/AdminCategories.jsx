import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import AdminDataSummary from "../../../components/adminDashboard/adminDataSummary/AdminDataSummary";
import { useNavigate } from "react-router-dom";

function AdminCategories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCategoriesLoaded) {
      fetchCategoriesData();
    }
  }, [isCategoriesLoaded]);

  // fetch categories data function
  async function fetchCategoriesData() {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/categories"
      );
      setCategoriesData(res.data.categories);
      setIsCategoriesLoaded(true);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // category delete function
  async function handleDelete(name) {
    if (window.confirm(`Are you sure you want to delete Category ${name}?`)) {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories/${name}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsCategoriesLoaded(false);
      } catch (error) {
        console.error("Failed to delete category:", error);
        alert("Failed to delete category. Please try again.");
      }
    }
  }

  // Column headers for Room table
  const categoryColumns = [
    "Image",
    "Name",
    "Price (Rs.)",
    "Features",
    "Description",
    "Action",
  ];

  // Fields corresponding to the columns
  const categoryFields = ["image", "name", "price", "features", "description"];
  return (
    <>
      <div className="h-full flex flex-col">
        <AdminDataSummary
          onAddElementClick={() => {
            navigate("/admin/add-category");
          }}
        />
        <div className="overflow-y-auto">
          <DataTable
            columns={categoryColumns}
            fields={categoryFields}
            data={categoriesData}
            deleteElement={handleDelete}
            elementIdentifier={"name"}
          />
        </div>
      </div>
    </>
  );
}

export default AdminCategories;
