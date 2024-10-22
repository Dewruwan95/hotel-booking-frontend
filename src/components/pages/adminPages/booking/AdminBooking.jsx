import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { bookings } from "../../../../data/BookingsData";

function AdminBooking() {
  return (
    <div className="w-full h-full p-[20px] bg-purple-200">
      <table className="w-full bg-white rounded-[10px] overflow-hidden">
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="py-3 px-6 text-center">Timestamp</th>
            <th className="py-3 px-6 text-center">Booking ID</th>
            <th className="py-3 px-6 text-center">Room ID</th>
            <th className="py-3 px-6 text-center">Email</th>
            <th className="py-3 px-6 text-center">Reason</th>
            <th className="py-3 px-6 text-center">Start Date</th>
            <th className="py-3 px-6 text-center">End Date</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr
              key={index}
              className={`border-b border-purple-200 ${
                index % 2 === 0 ? "bg-purple-100" : "bg-white"
              }`}
            >
              <td className="py-4 px-6 text-center">
                {new Date(booking.timestamp).toLocaleDateString()}
              </td>
              <td className="py-4 px-6 text-center">{booking.bookingId}</td>
              <td className="py-4 px-6 text-center">{booking.roomId}</td>
              <td className="py-4 px-6 text-center">{booking.email}</td>
              <td className="py-4 px-6 text-center">{booking.reason}</td>
              <td className="py-4 px-6 text-center">{booking.start}</td>
              <td className="py-4 px-6 text-center">{booking.end}</td>
              <td className="py-4 px-6 text-center">
                <span
                  className={`${
                    booking.status === "confirmed"
                      ? "text-green-500"
                      : booking.status === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.status}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBooking;
