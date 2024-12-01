import { FaExpandArrowsAlt, FaUserFriends } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";

function RoomCard({ room }) {
  return (
    <>
      <div className="border-[10px] border-white max-w-sm min-w-[380px] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 mt-[50px]">
        {/* Image Section */}
        <img
          src={room.photos}
          alt="Room"
          className="w-full h-48 object-cover rounded-lg"
        />

        {/* Content Section */}
        <div className="p-6 ">
          {/* max guests */}
          <div className="flex items-center text-purple-950">
            <FaUserFriends className="mr-2" />
            Max Guests: {room.maxGuests}
          </div>

          {/* Features Row */}
          <div className="flex items-center bg-purple-100 rounded-xl p-3 my-4">
            <div className="flex items-center gap-2 text-gray-500">
              <span>{room.categoryData.features.join(" | ")}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800">
            {room.category} Room
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-2 mb-4">
            {room.specialDescription}
          </p>

          {/* Footer Section */}
          <div className="flex justify-between items-center">
            <span className="text-purple-600 font-bold text-lg">
              {room.categoryData.price.toLocaleString()} LKR per night
            </span>
            <button className="bg-purple-600 text-white px-[25px] py-[10px] rounded-full shadow hover:bg-purple-700 flex items-center justify-center">
              <IoBookmarkOutline className="mr-2" />
              Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomCard;
