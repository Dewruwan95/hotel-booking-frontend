import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaGear } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";

function AdminDashboardOptions() {
  return (
    <div className="h-full w-full flex">
      {/* Notification Icon */}
      <div className="w-1/3 border-t-[2px] border-r-[1px] border-purple-200 flex justify-center">
        <button>
          <IoMdNotifications className="w-[30px] h-[30px] text-white hover:text-purple-300" />
        </button>
      </div>

      {/* Settings Icon */}
      <div className="w-1/3 border-t-[2px]  border-l-[1px] border-r-[1px] border-purple-200 flex justify-center">
        <button>
          <FaGear className="w-[30px] h-[30px] text-white hover:text-purple-300" />
        </button>
      </div>

      {/* Chat Icon */}
      <div className="w-1/3 border-t-[2px] border-l-[1px] border-purple-200 flex justify-center">
        <button>
          <BiSolidMessageRoundedDetail className="w-[30px] h-[30px] text-white hover:text-purple-300" />
        </button>
      </div>
    </div>
  );
}

export default AdminDashboardOptions;
