import { FaPlus } from "react-icons/fa";

function AdminDataSummary({
  onAddElementClick,
  roomsSummary,
  categoriesSummary,
  usersSummary,
  feedbackSummary,
  ticketsSummary,
  gallerySummary,
}) {
  return (
    <div>
      <div className="w-full h-[150px] rounded-tl-[10px] px-[20px] pt-[20px] flex items-center justify-center">
        {/* summary area */}
        <div className="w-[100%] h-full rounded-[10px] bg-purple-600 flex flex-row justify-center items-center">
          {roomsSummary ? (
            // rooms summary section
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
          ) : categoriesSummary ? (
            // categories summary section
            <div className="flex h-full justify-between w-full px-[20px]">
              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Total <br /> Categories
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {categoriesSummary.totalCategories}
                  </span>
                </div>
              </div>
            </div>
          ) : usersSummary ? (
            // users summary section
            <div className="flex h-full justify-between w-full px-[20px]">
              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Total <br /> Users
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {usersSummary.totalUsers}
                  </span>
                </div>
              </div>

              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Active <br /> Users
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {usersSummary.totalActiveUsers}
                  </span>
                </div>
              </div>

              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Banned <br /> Users
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {usersSummary.totalBannedUsers}
                  </span>
                </div>
              </div>

              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Verified <br /> Users
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {usersSummary.totalEmailVerifiedUsers}
                  </span>
                </div>
              </div>
            </div>
          ) : feedbackSummary ? (
            // feedback summary section
            <div className="flex h-full justify-between w-full px-[20px]">
              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Total <br /> Feedbacks
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {feedbackSummary.totalFeedbacks}
                  </span>
                </div>
              </div>

              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Verified <br /> Feedbacks
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {feedbackSummary.totalVerifiedFeedbacks}
                  </span>
                </div>
              </div>

              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Pending <br /> Feedbacks
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {feedbackSummary.totalPendingFeedbacks}
                  </span>
                </div>
              </div>
            </div>
          ) : ticketsSummary ? (
            // tickets summary section
            <div className="flex h-full justify-between w-full px-[20px]">
              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Total <br /> Inquiries
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {ticketsSummary.totalInquiries}
                  </span>
                </div>
              </div>

              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Pending <br /> Inquiries
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {ticketsSummary.totalPendingInquiries}
                  </span>
                </div>
              </div>

              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Resolved <br /> Inquiries
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {ticketsSummary.totalResolvedInquiries}
                  </span>
                </div>
              </div>
            </div>
          ) : gallerySummary ? (
            // gallery summary section
            <div className="flex h-full justify-between w-full px-[20px]">
              <div className="flex h-full items-center justify-center py-[10px]">
                <div className="bg-white px-[20px] h-full  rounded-[10px] flex items-center text-purple-800">
                  <span className="text-[30px] text-center">
                    Total <br /> Events
                  </span>
                  <span className="text-[30px] text-center ml-2"> : </span>
                  <span className="ml-[10px] text-[50px] font-extrabold text-center">
                    {gallerySummary.totalEvents}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* button area */}
        {onAddElementClick && (
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
        )}
      </div>
    </div>
  );
}

export default AdminDataSummary;
