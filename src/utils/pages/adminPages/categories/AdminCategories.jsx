import { useEffect, useState } from "react";
import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import axios from "axios";
import AdminDataSummary from "../../../components/adminDashboard/adminDataSummary/AdminDataSummary";
import { useNavigate } from "react-router-dom";
import DataPagination from "../../../components/pagination/DataPagination";

function AdminCategories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCategoriesLoaded) {
      fetchCategoriesData();
    }
  }, [isCategoriesLoaded]);

  useEffect(() => {
    fetchCategoriesData();
  }, [page, pageSize]);

  // fetch categories data function
  async function fetchCategoriesData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/categories/all",
        { page: page, pageSize: pageSize },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategoriesData(res.data.categories);
      setTotalPages(res.data.pagination.totalPages);
      setIsCategoriesLoaded(true);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // category delete function
  async function handleDelete(name) {
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
        <div className="h-[17%]">
          <AdminDataSummary
            onAddElementClick={() => {
              navigate("/admin/add-category");
            }}
          />
        </div>
        <div className="h-full overflow-y-auto">
          <DataTable
            columns={categoryColumns}
            fields={categoryFields}
            data={categoriesData}
            deleteElement={handleDelete}
            editElementPath={"/admin/update-category"}
            elementIdentifier={"name"}
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

export default AdminCategories;
