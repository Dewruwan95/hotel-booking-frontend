import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { format, set } from "date-fns";
import toast from "react-hot-toast";

function CustomerFeedbackPage() {
  const token = localStorage.getItem("token");

  const [reviewableBookings, setReviewableBookings] = useState([]); // bookings only confirmed
  const [feedbackData, setFeedbackData] = useState([]); // feedbacks put by user
  const [bookingFeedbacks, setBookingFeedbacks] = useState([]); // combined bookings with feedback
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCreateFeedbackClicked, setIsCreateFeedbackClicked] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [processing, setProcessing] = useState(false);

  const bookingColumns = [
    "Timestamp",
    "Booking ID",
    "Room ID",
    "Status",
    "Action",
  ];

  const bookingFields = [
    "timestamp",
    "bookingId",
    "roomId",
    "status",
    "feedback",
  ];

  useEffect(() => {
    fetchBookingsData();
    fetchFeedbackData();
  }, [isCreateFeedbackClicked]);

  useEffect(() => {
    if (reviewableBookings.length > 0) {
      combineBookingsWithFeedback();
    }
  }, [reviewableBookings, feedbackData]);

  // fetch bookings data
  async function fetchBookingsData() {
    setLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/all",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const bookingsData = res.data.bookings;
      const confirmedBookings = bookingsData.filter(
        (booking) => booking.status === "confirmed"
      );
      setReviewableBookings(confirmedBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  }

  // fetch feedbacks data
  async function fetchFeedbackData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/feedbacks/all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedbackData(res.data.feedbacks || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // Combine bookings with feedbacks
  function combineBookingsWithFeedback() {
    const combinedData = reviewableBookings.map((booking) => {
      const feedback = feedbackData.find(
        (feedback) => feedback.bookingId == booking.bookingId
      );

      return {
        ...booking,
        feedback: feedback || null, // Add feedback object if available, otherwise null
      };
    });

    setBookingFeedbacks(combinedData);
  }

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating == 0) {
      return toast.error("Please select a rating");
    }
    setProcessing(true);
    toast.loading("Submitting Feedback...");

    const newFeedback = {
      bookingId: selectedBooking.bookingId,
      title: title,
      description: description,
      rating: rating,
    };

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/feedbacks",
        newFeedback,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.dismiss();
      toast.success(res.data.message);
      setIsCreateFeedbackClicked(false);
      setTitle("");
      setDescription("");
      setRating(0);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
      console.error("Error submitting feedback", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4 h-[100vh] mt-[70px] lg:mt-[100px] xl:mt-[120px] bg-purple-100  lg:px-[300px]">
      <div>
        <h1 className="text-4xl font-bold text-purple-700 text-center pt-4 mb-6">
          Customer Feedbacks
        </h1>

        {/* Booking Table */}
        <div className="bg-white p-4 shadow rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Reviewable Bookings</h2>
          {loading ? (
            <p>Loading...</p>
          ) : bookingFeedbacks.length > 0 ? (
            <div className="w-full h-full max-h-[400px] overflow-y-auto rounded-[10px]">
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
                  {bookingFeedbacks.map((data, index) => (
                    <tr
                      key={index}
                      className={`border-b border-purple-200 ${
                        index % 2 === 0 ? "bg-purple-100" : "bg-white"
                      }`}
                    >
                      {bookingFields.map((field, fieldIndex) => (
                        <td
                          key={fieldIndex}
                          className="py-4 px-6 text-center whitespace-normal overflow-hidden text-ellipsis"
                        >
                          {field === "start" || field === "end" ? (
                            new Date(data[field]).toLocaleDateString()
                          ) : field === "timestamp" ? (
                            format(new Date(data[field]), "dd/MM/yyyy")
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
                              {data[field].charAt(0).toUpperCase() +
                                data[field].slice(1)}
                            </span>
                          ) : field === "feedback" ? (
                            <div>
                              {data[field] === null ? (
                                <div>
                                  <button
                                    onClick={() => {
                                      setIsCreateFeedbackClicked(true);
                                      setSelectedBooking(data);
                                    }}
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r-full rounded-l-full w-[120px]"
                                  >
                                    Create
                                  </button>
                                </div>
                              ) : data[field]["approved"] === true ? (
                                <div>
                                  <span className=" text-green-500 font-bold py-2 px-4  w-[120px]">
                                    Approved
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <span className=" text-yellow-500 font-bold py-2 px-4  w-[120px]">
                                    Pending
                                  </span>
                                </div>
                              )}
                            </div>
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

        {isCreateFeedbackClicked && (
          <>
            {/* Feedback Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-8"
            >
              <div className="pb-4">
                <span className="text-lg font-bold text-gray-600">
                  Create Feedback for Booking ID: {selectedBooking.bookingId}
                </span>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Rating
                </label>
                <div className="flex gap-">
                  {Array.from({ length: 5 }, (_, index) => (
                    <AiFillStar
                      key={index}
                      className={`text-[40px] cursor-pointer ${
                        rating >= index + 1
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleStarClick(index + 1)}
                    />
                  ))}
                </div>
              </div>
              {!processing ? (
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                >
                  Submit Feedback
                </button>
              ) : (
                <button
                  disabled={true}
                  type="submit"
                  className="flex items-center justify-center w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                >
                  <AiOutlineLoading3Quarters className="mr-2 animate-spin font-bold	" />
                  Processing
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomerFeedbackPage;
