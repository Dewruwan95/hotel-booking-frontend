import { FaPlus } from "react-icons/fa";

function AdminDataSummary({ onAddElementClick }) {
  return (
    <div>
      <div className="w-full h-[150px] rounded-tl-[10px] px-[20px] pt-[20px] flex items-center justify-center">
        {/* summary area */}
        <div className="w-[100%] h-full rounded-[10px] bg-purple-600">
          <h1>Some data Summary and search bar</h1>
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
