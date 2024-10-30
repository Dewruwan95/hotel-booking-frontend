import { IoMdCloseCircleOutline } from "react-icons/io";

function CustomAlert({ message, onClose }) {
  return (
    <div>
      <div className="fixed top-0 left-0 bottom-10 w-full h-full z-50 flex justify-center bg-black bg-opacity-80">
        <div className="h-[150px] w-[400px] mt-[300px] bg-purple-100 shadow-lg rounded-md p-4 flex items-center relative">
          <p className="text-center text-lg text-purple-500">{message}</p>
          {/* close button */}
          <div>
            <button
              className="h-[40px] w-[40px] absolute bg-purple-100 rounded-full right-[-20px] top-[-20px]
            flex justify-center items-center
            "
              onClick={onClose}
            >
              <IoMdCloseCircleOutline className="text-[40px] text-purple-950 hover:text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
