import { FaPlus } from "react-icons/fa";

function AdminDataSummary({ onAddElementClick, roomsSummary }) {
  console.log(roomsSummary);

  return (
    <div>
      <div className="w-full h-[150px] rounded-tl-[10px] px-[20px] pt-[20px] flex items-center justify-center">
        {/* summary area */}
        <div className="w-[100%] h-full rounded-[10px] bg-purple-600 flex flex-row justify-center items-center">
          <div className="flex h-full justify-between w-full px-[20px]">
            <div className="flex h-full items-center justify-center py-[10px]">
              <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                <span className="text-[30px] text-center">
                  Total <br /> Rooms
                </span>
                <span className="text-[30px] text-center ml-2"> : </span>
                <span className="ml-[10px] text-[50px] font-extrabold text-center">
                  {roomsSummary.totalRooms}
                </span>
              </div>
            </div>

            <div className="flex h-full items-center justify-center py-[10px]">
              <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                <span className="text-[30px] text-center">
                  Available <br /> Rooms
                </span>
                <span className="text-[30px] text-center ml-2"> : </span>
                <span className="ml-[10px] text-[50px] font-extrabold text-center">
                  {roomsSummary.availableRooms}
                </span>
              </div>
            </div>

            <div className="flex h-full items-center justify-center py-[10px]">
              <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                <span className="text-[30px] text-center">
                  Unavailable <br /> Rooms
                </span>
                <span className="text-[30px] text-center ml-2"> : </span>
                <span className="ml-[10px] text-[50px] font-extrabold text-center">
                  {roomsSummary.notAvailableRooms}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* button area */}
        <div className="w-[130px] h-full rounded-[10px] ml-[20px] flex flex-col justify-center items-center">
          {/* add new element button */}
          <button
            className="h-[80px] w-[80px] rounded-full  bg-purple-600 flex justify-center items-center hover:bg-purple-500 shadow-md"
            onClick={onAddElementClick}
          >
            <FaPlus className="text-white text-[50px] transition-transform duration-300 ease-in-out hover:rotate-90" />
          </button>
          <span className="text-purple-600 text-center flex justify-center items-center text-[20px] font-bold">
            Add New
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminDataSummary;
