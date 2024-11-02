import { FaPlus } from "react-icons/fa";

function AdminDataSummary() {
  return (
    <div>
      <div className="w-full h-[150px] rounded-tl-[10px] px-[20px] pt-[20px] flex items-center justify-center">
        <div className="w-[100%] h-full rounded-[10px] bg-purple-600"></div>
        <div className="w-[130px] h-full rounded-[10px] ml-[20px]">
          <button className="h-[130px] w-[130px] rounded-full  bg-purple-600 flex justify-center items-center hover:bg-purple-500">
            <FaPlus className="text-white text-[70px] transition-transform duration-300 ease-in-out hover:rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDataSummary;
