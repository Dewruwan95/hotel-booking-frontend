import DataTable from "../../../components/adminDashboard/adminDataTable/DataTable";
import { categories } from "../../../data/CategoriesData";

function AdminCategories() {
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
        data={categories}
      />
    </>
  );
}

export default AdminCategories;
