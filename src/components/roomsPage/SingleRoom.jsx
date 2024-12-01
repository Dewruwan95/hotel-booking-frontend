import { useState } from "react";
import { FaUserFriends, FaExpandArrowsAlt } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
function SingleRoom({ room }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSearch = () => {
    console.log("Search clicked", {
      checkInDate,
      checkOutDate,
      adults,
      children,
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 lg:px-8 py-12">
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
          <div className="bg-white p-6 rounded-xl shadow-lg">
            {/* Features */}
            <div className="flex space-x-6 mb-6">
              <div className="flex items-center text-gray-700">
                <FaUserFriends className="mr-2" />
                Max Guests: {room.maxGuests}
              </div>
            </div>

            {/* Price */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Prices start at:
            </h3>
            <span className="text-purple-600 text-2xl font-bold">
              {room.categoryData.price.toLocaleString()} LKR per night
            </span>

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

              {/* Adults and Children */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Adults</label>
                  <select
                    className="w-full bg-gray-100 rounded-md px-3 py-2"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">
                    Children
                  </label>
                  <select
                    className="w-full bg-gray-100 rounded-md px-3 py-2"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleRoom;
