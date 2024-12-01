import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { AiOutlineCalendar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SingleRoom({ room }) {
  const token = localStorage.getItem("token");

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [category, setCategory] = useState(room.category);
  const [roomNo, setRoomNo] = useState(room.roomNo);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  // handle booking
  async function handleBooking() {
    if (!checkInDate || !checkInDate || !category) {
      toast.error("Please fill the fields before place a booking!");
    } else {
      const newBookingData = {
        start: checkInDate,
        end: checkInDate,
        category: category,
        roomNo: roomNo,
      };
      if (!token) {
        toast.error("Please login before     place a booking!");
      } else {
        toast.loading("Placing Booking...");
        setProcessing(true);
        try {
          const res = await axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/bookings/create-by-room",
            newBookingData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.status === 200) {
            localStorage.removeItem("pendingBookingData");
            toast.dismiss();
            toast.success("Booking placed successfully");

            clearFields();

            navigate("/bookings");
          }
        } catch (error) {
          console.log(error);
          toast.dismiss();
          toast.error(error.response.data.message);
        } finally {
          setProcessing(false);
        }
      }
    }
  }

  function clearFields() {
    setCheckInDate("");
    setCheckOutDate("");
    setCategory("");
    setRoomNo("");
  }

  return (
    <>
      <div className="container mx-auto p-4 lg:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Room Image and Thumbnails */}
          <div>
            <img
              src={room.photos}
              alt="Room"
              className="w-full rounded-xl shadow-lg"
            />
            {/* <div className="flex space-x-4 mt-4">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={`https://via.placeholder.com/100x75?text=Image+${
                    index + 1
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-24 h-16 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                />
              ))}
            </div> */}
          </div>

          {/* Right Section - Room Details */}

          <div className=" rounded-xl ">
            {/* Features */}
            <div className="bg-white rounded-xl flex flex-col items-center justify-center py-2">
              <div className="flex items-center justify-center  space-x-6">
                <div className="flex items-center justify-center text-gray-700 text-[25px]">
                  <div className="bg-purple-50 w-[50px] h-[50px] rounded-full flex justify-center items-center mr-3">
                    <MdMeetingRoom />
                  </div>
                  {room.category} Room
                </div>
                <div className="flex items-center justify-center text-gray-700 text-[25px]">
                  <div className="bg-purple-50 w-[50px] h-[50px] rounded-full flex justify-center items-center mr-3">
                    <FaUserFriends />
                  </div>
                  Max Guests: {room.maxGuests}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl flex flex-col items-center justify-center py-8 mt-5">
              {/* Price */}
              <strong className="text-xl text-gray-700 mb-2">
                Prices start at:
              </strong>
              <div className="inline-block">
                <span className="text-purple-600 text-4xl font-bold align-middle">
                  {room.categoryData.price.toLocaleString()} LKR
                </span>
                <span className="text-gray-700 text-xl align-bottom pl-2">
                  per night
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl flex flex-col items-center justify-center py-8 mt-5">
              {/* Form */}
              <div className="mt-6 space-y-4">
                {/* Check-in and Check-out */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">
                      Check-in
                    </label>
                    <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                      <AiOutlineCalendar className="mr-2 text-gray-500" />
                      <input
                        type="date"
                        className="w-full bg-transparent border-none outline-none"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Check-out
                    </label>
                    <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                      <AiOutlineCalendar className="mr-2 text-gray-500" />
                      <input
                        type="date"
                        className="w-full bg-transparent border-none outline-none"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <div className="flex justify-center">
                  {!processing ? (
                    <button
                      onClick={handleBooking}
                      className="bg-purple-600 text-white font-extrabold text-lg px-12 flex items-center justify-center mt-5 py-4 rounded-full shadow-lg hover:bg-purple-700 transition"
                    >
                      <IoBookmarkOutline className="mr-2 " /> Book
                    </button>
                  ) : (
                    <button
                      disabled={true}
                      onClick={handleBooking}
                      className="bg-purple-600 text-white font-extrabold text-lg px-12 flex items-center justify-center mt-5 py-4 rounded-full shadow-lg  transition"
                    >
                      <AiOutlineLoading3Quarters className="mr-2 animate-spin font-bold	" />
                      Processing...
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-10">
          {room.categoryData.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-full px-5 p-3 my-4"
            >
              <div className="flex items-center gap-2 text-purple-500">
                <span>{feature}</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center bg-white rounded-xl p-3 my-4">
            <div className="flex items-center gap-2 text-purple-500">
              <span>{room.specialDescription}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center bg-white rounded-xl p-3 my-4">
            <div className="flex items-center gap-2 text-purple-500">
              <span>{room.categoryData.description}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleRoom;
