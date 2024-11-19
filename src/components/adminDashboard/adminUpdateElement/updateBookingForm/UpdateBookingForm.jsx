import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function UpdateBookingForm() {
  // check if state is available
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/admin/bookings";
  }

  // check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const booking = location.state.data;

  const [bookingId, setBookingId] = useState(booking.bookingId);
  const [roomNo, setRoomNo] = useState(booking.roomId);
  const [email, setEmail] = useState(booking.email);
  const [status, setStatus] = useState(booking.status);
  const [reason, setReason] = useState(booking.reason);
  const [start, setStart] = useState(booking.start);
  const [end, setEnd] = useState(booking.end);
  const [notes, setNotes] = useState(booking.notes);
  const [timestamp, setTimestamp] = useState(booking.timestamp);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      fetchUserData();
    }
  }, [email]);

  // fetch user data function
  async function fetchUserData() {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + booking.email,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFirstName(res.data.user.firstName);
      setLastName(res.data.user.lastName);
      setPhone(res.data.user.phone);
      setWhatsApp(res.data.user.whatsApp);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  //-----------------------------------------------------------------
  //!---------------- update booking function -----------------------
  //-----------------------------------------------------------------
  async function handleUpdateBooking() {
    setProcessing(true);
    toast.loading("Updating Booking...");

    // create new booking object
    const updatedBooking = {
      notes: notes,
      status: status,
    };

    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/" + bookingId,
        updatedBooking,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        toast.dismiss();
        toast.success("Booking updated successfully");
        navigate("/admin/bookings");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update booking, Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[600px] h-full flex flex-col justify-center pt-[20px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateBooking();
          }}
        >
          <div className="flex flex-col items-center">
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-purple-200">
                <tbody className="bg-white divide-y divide-purple-200">
                  <tr className="hover:bg-purple-50">
                    <td className="w-[150px] bg-purple-600 text-white py-3 px-6 text-center">
                      Placed On
                    </td>
                    <td className="w-[400px] px-6 py-4 text-sm text-gray-900">
                      {format(new Date(timestamp), "yyyy MMMM dd - h:mma")}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Booking ID
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {bookingId}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Room No
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {roomNo}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Start
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {format(new Date(start), "yyyy MMMM dd")}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      End
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {format(new Date(end), "yyyy MMMM dd")}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Reason
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {reason}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Name
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {`${firstName} ${lastName}`}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Email
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{email}</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Phone
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{phone}</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      WhatsApp
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {whatsApp}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Notes
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        rows="3"
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Status
                    </td>
                    <td className="px-6 py-4 text-md text-gray-900">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`px-4 py-2 font-bold border rounded-md ${
                          status === "confirmed"
                            ? "text-green-500"
                            : status === "cancelled"
                            ? "text-red-500"
                            : "text-orange-500"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-4">
              {!processing ? (
                <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                  <GrUpdate className="mr-2" />
                  Update Booking
                </button>
              ) : (
                <button
                  className="w-[505px] h-[40px] bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-md flex items-center justify-center"
                  disabled
                >
                  <AiOutlineLoading3Quarters className="mr-2 animate-spin font-bold" />
                  Processing...
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBookingForm;
