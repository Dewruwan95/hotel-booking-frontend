import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";
import { format } from "date-fns";

function CustomerBookingPage({ categoriesData }) {
  const token = localStorage.getItem("token");

  const [bookings, setBookings] = useState([]);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Column headers for Booking table
  const bookingColumns = [
    "Timestamp",
    "Booking ID",
    "Room ID",
    "Start Date",
    "End Date",
    "Status",
  ];

  // Fields corresponding to the columns
  const bookingFields = [
    "timestamp",
    "bookingId",
    "roomId",
    "start",
    "end",
    "status",
  ];

  // Fetch bookings for the logged-in customer
  useEffect(() => {
    fetchBookings();
  }, [success]);

  // fetch bookings function
  async function fetchBookings() {
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/all",
        { page: 1, pageSize: 10 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(response.data.bookings || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Handle new booking submission
  async function handleNewBooking(e) {
    e.preventDefault();

    if (!startDate) {
      return toast.error("Please select a start date.");
    }

    if (!endDate) {
      return toast.error("Please select an end date.");
    }

    setLoading(true);
    toast.loading("Placing Booking...");
    setSuccess("");
    try {
      const newBooking = {
        category: category,
        start: new Date(startDate).toISOString(),
        end: new Date(endDate).toISOString(),
        reason: reason,
        notes: notes,
      };

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/create-by-category",
        newBooking,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Booking placed successfully!");
      toast.dismiss();
      toast.success("Booking placed successfully!");

      // Reset form fields
      setCategory("");
      setStartDate("");
      setEndDate("");
      setNotes("");
    } catch (err) {
      console.log(err);
      toast.dismiss();
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="p-4 mb-10 mt-[120px] bg-purple-100  lg:px-[300px] ">
        <h1 className="text-4xl font-bold text-purple-700 text-center pt-4 mb-6">
          Customer Bookings
        </h1>

        <div className="mb-[50px]">
          {/* Existing Bookings */}
          <div className="bg-white p-4 shadow rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
            {loading ? (
              <p>Loading...</p>
            ) : bookings.length > 0 ? (
              <div className="w-full h-full max-h-[400px] overflow-y-hidden rounded-[10px]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-purple-600 text-white sticky top-0">
                      {bookingColumns.map((column, index) => (
                        <th key={index} className="py-3 px-6 text-center">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((data, index) => (
                      <tr
                        key={index}
                        className={`border-b h-auto max-h-[150px]  border-purple-200 ${
                          index % 2 === 0 ? "bg-purple-100" : "bg-white"
                        }`}
                      >
                        {bookingFields.map((field, fieldIndex) => (
                          <td
                            key={fieldIndex}
                            className="py-4 px-6 text-center max-w-xs h-auto max-h-[150px] whitespace-normal overflow-hidden text-ellipsis"
                          >
                            {field === "start" || field === "end" ? (
                              new Date(data[field]).toLocaleDateString()
                            ) : field === "timestamp" ? (
                              format(new Date(data[field]), "dd/mm/yyyy")
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
                            ) : (
                              data[field]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No bookings found.</p>
            )}
          </div>
          {/* New Booking Form */}
          <div className="bg-white p-4 shadow rounded-lg ">
            <h2 className="text-xl font-semibold mb-2">Create a New Booking</h2>
            <form onSubmit={handleNewBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoriesData.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    fromDate={new Date()}
                    required={true}
                    className="w-full max-w-[280px] rounded-md border"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    fromDate={new Date()}
                    required={true}
                    className="w-full max-w-[280px] rounded-md border"
                  />
                </div>
              </div>
              {/* Reason Text Field */}
              <div>
                <label className="block text-sm font-medium mb-1">Reason</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter your reason for booking..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                />
              </div>
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
                disabled={loading}
              >
                {loading ? "Placing..." : "Place Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerBookingPage;
