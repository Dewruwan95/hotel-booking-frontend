import { TbLogin2 } from "react-icons/tb";

function LogedOutItems({ openLoginPopup }) {
  return (
    <div>
      <button
        className="px-6 py-3  text-white text-lg font-semibold rounded-lg  hover:text-purple-300 transition duration-300 ease-in-out
        flex items-center"
        onClick={openLoginPopup}
      >
        <TbLogin2 className="text-[20px] lg:text-[25px] xl:text-[30px] mr-1" />
        <div className="text-[15px] lg:text-[18px] xl:text-[20px]">
          Login / Sign Up
        </div>
      </button>
    </div>
  );
}

export default LogedOutItems;
