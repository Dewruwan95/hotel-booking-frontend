import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
function TableRow({ fields, data, index }) {
  return (
    <>
      <tr
        className={`border-b border-purple-200 ${
          index % 2 === 0 ? "bg-purple-100" : "bg-white"
        }`}
      >
        {fields.map((field, fieldIndex) => (
          <td key={fieldIndex} className="py-4 px-6 text-center">
            {field === "timestamp" || field === "start" || field === "end" ? (
              new Date(data[field]).toLocaleDateString()
            ) : field === "status" ? (
              <span
                className={`${
                  data[field] === "confirmed"
                    ? "text-green-500"
                    : data[field] === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {data[field]}
              </span>
            ) : field === "available" ? (
              <span
                className={`${
                  data[field] === true ? "text-green-500" : "text-red-500"
                }`}
              >
                {data[field] === true ? "Available" : "Not Available"}
              </span>
            ) : (
              data[field]
            )}
          </td>
        ))}

        {/* Add the Action column */}
        <td className="py-4 px-6 text-center">
          <div className="flex justify-center items-center">
            <Link to="">
              <FaEdit className="text-purple-500" />
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableRow;
