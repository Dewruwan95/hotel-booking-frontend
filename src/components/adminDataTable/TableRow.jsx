import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
function TableRow(props) {
  return (
    <>
      <tr
        key={props.index}
        className={`border-b border-purple-200 ${
          props.index % 2 === 0 ? "bg-purple-100" : "bg-white"
        }`}
      >
        <td className="py-4 px-6 text-center">
          {new Date(props.row.timestamp).toLocaleDateString()}
        </td>
        <td className="py-4 px-6 text-center">{props.row.bookingId}</td>
        <td className="py-4 px-6 text-center">{props.row.roomId}</td>
        <td className="py-4 px-6 text-center">{props.row.email}</td>
        <td className="py-4 px-6 text-center">{props.row.reason}</td>
        <td className="py-4 px-6 text-center">{props.row.start}</td>
        <td className="py-4 px-6 text-center">{props.row.end}</td>
        <td className="py-4 px-6 text-center">
          <span
            className={`${
              props.row.status === "confirmed"
                ? "text-green-500"
                : props.row.status === "pending"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {props.row.status}
          </span>
        </td>
        <td className="py-4 px-6 text-center">
          <div className="flex justify-center items-center">
            <Link to="">
              <FaEdit className="text-purple-500 " />
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableRow;
