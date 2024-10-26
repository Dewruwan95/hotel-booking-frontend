import { IoMdCloseCircleOutline } from "react-icons/io";

function LoginSignUpPopup() {
  return (
    <>
      {/*  background */}
      <div className="h-[100vh] w-full flex justify-center items-center bg-[#00000066]">
        {/* component background */}
        <div className="w-[800px] h-[600px] bg-purple-100 rounded-lg relative">
          {/* close button */}
          <div
            className="h-[40px] w-[40px] absolute bg-white rounded-full right-[-20px] top-[-20px] 
          flex justify-center items-center
          "
          >
            <IoMdCloseCircleOutline className="text-[40px] text-purple-950 hover:text-purple-600" />
          </div>
          {/* component body */}
          <div className="flex h-[100%]">
            <div className="h-[100%] w-[40%] bg-green-400">1</div>
            <div className="h-[100%] w-[60%] bg-red-400">
              <div className="w-full h-[15%] bg-orange-400">2</div>

              <div>3</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignUpPopup;
