import { format } from "date-fns";
import { AiFillStar } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Render table rows dynamically
function TableRow({
  fields,
  data,
  index,
  deleteElement,
  editElementPath,
  elementIdentifier,
}) {
  return (
    <>
      <tr
        className={`border-b h-auto max-h-[150px]  border-purple-200 ${
          index % 2 === 0 ? "bg-purple-100" : "bg-white"
        }`}
      >
        {fields.map((field, fieldIndex) => (
          <td
            key={fieldIndex}
            className="py-4 px-6 text-center max-w-xs h-auto max-h-[150px] whitespace-normal overflow-hidden text-ellipsis"
          >
            {field === "start" || field === "end" ? (
              new Date(data[field]).toLocaleDateString()
            ) : field === "timestamp" ? (
              format(new Date(data[field]), "yyyy MMMM dd h:mma")
            ) : field === "status" ? (
              <span
                className={`${
                  data[field] === "confirmed"
                    ? "text-green-500"
                    : data[field] === "pending"
                    ? "text-yellow-500"
                    : data[field] === "resolved"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {data[field].charAt(0).toUpperCase() + data[field].slice(1)}
              </span>
            ) : field === "available" ? (
              <span
                className={`${
                  data[field] === true ? "text-green-500" : "text-red-500"
                }`}
              >
                {data[field] === true ? "Available" : "Not Available"}
              </span>
            ) : field === "price" ? (
              // Format the price field to show commas and two decimal places
              parseFloat(data[field]).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            ) : field === "features" && Array.isArray(data[field]) ? (
              // Join the features array into a comma-separated string
              data[field].join(", ")
            ) : field === "approved" ? (
              <span
                className={`${
                  data[field] === true ? "text-green-500" : "text-orange-500"
                }`}
              >
                {data[field] === true ? "Approved" : "Pending"}
              </span>
            ) : field === "image" ? (
              <div
                className="w-[100px] h-[100px] rounded-[6px] bg-cover bg-center mx-auto"
                style={{ backgroundImage: `url(${data[field]})` }}
              ></div>
            ) : field === "photos" ? (
              <div
                className="w-[100px] h-[100px] rounded-[6px] bg-cover bg-center mx-auto"
                style={{ backgroundImage: `url(${data[field]})` }}
              ></div>
            ) : field === "firstName" ? (
              <span>
                {data[field]} {data["lastName"]}
              </span>
            ) : field === "emailVerify" ? (
              <span
                className={`${
                  data[field] === true ? "text-green-500" : "text-orange-500"
                }`}
              >
                {data[field] === true ? "Verified" : "Not Verified"}
              </span>
            ) : field === "disabled" ? (
              <span
                className={`${
                  data[field] === false ? "text-green-500" : "text-red-500"
                }`}
              >
                {data[field] === false ? "Active" : "Banned"}
              </span>
            ) : field === "type" ? (
              <span
                className={`${
                  data[field] === "superAdmin"
                    ? "text-blue-500"
                    : data[field] === "admin"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {data[field] === "superAdmin"
                  ? "Super Admin"
                  : data[field] === "admin"
                  ? "Admin"
                  : "Customer"}{" "}
              </span>
            ) : field === "rating" ? (
              <span className="flex justify-center items-center">
                {Array.from({ length: data[field] }, (_, index) => (
                  <AiFillStar key={index} className="text-yellow-500" />
                ))}
              </span>
            ) : field === "inquiryType" ? (
              <span>
                {data[field].charAt(0).toUpperCase() + data[field].slice(1)}
              </span>
            ) : (
              data[field]
            )}
          </td>
        ))}

        {/* Add the Action column */}
        <td className="py-4 px-2 text-center">
          <div className="flex justify-center items-center">
            <Link
              to={editElementPath}
              state={{ data }}
              className="flex justify-center items-center "
            >
              <FaEdit className="text-orange-500 text-[25px] mr-4" />
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex justify-center items-center ">
                  <RiDeleteBin2Fill className="text-red-500 text-[25px] ml-4" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-500">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data and remove from database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-700 hover:bg-red-600"
                    onClick={() => deleteElement(data[elementIdentifier])}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableRow;
