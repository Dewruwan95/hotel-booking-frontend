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
          {new Date(props.booking.timestamp).toLocaleDateString()}
        </td>
        <td className="py-4 px-6 text-center">{props.booking.bookingId}</td>
        <td className="py-4 px-6 text-center">{props.booking.roomId}</td>
        <td className="py-4 px-6 text-center">{props.booking.email}</td>
        <td className="py-4 px-6 text-center">{props.booking.reason}</td>
        <td className="py-4 px-6 text-center">{props.booking.start}</td>
        <td className="py-4 px-6 text-center">{props.booking.end}</td>
        <td className="py-4 px-6 text-center">
          <span
            className={`${
              props.booking.status === "confirmed"
                ? "text-green-500"
                : props.booking.status === "pending"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {props.booking.status}
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
