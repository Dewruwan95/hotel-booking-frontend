import { IoMdCloseCircleOutline } from "react-icons/io";
import UserRegistration from "./UserRegistration";
import UserLogin from "./UserLogin";

function LoginSignUpPopup() {
  return (
    <>
      {/*  background */}
      <div className="h-[100vh] w-full flex justify-center items-center bg-[#00000066]">
        {/* component background */}
        <div className="w-[950px] h-[700px] bg-purple-50 rounded-lg relative">
          {/* close button */}
          <div
            className="h-[40px] w-[40px] absolute bg-purple-50 rounded-full right-[-20px] top-[-20px] 
          flex justify-center items-center
          "
          >
            <IoMdCloseCircleOutline className="text-[40px] text-purple-950 hover:text-purple-600" />
          </div>
          {/* component body */}
          <div className="flex h-[100%]">
            {/* left image area */}
            <div className="h-[100%] w-[40%] ">
              <img
                src="srilanka.jpg"
                alt="Sri Lanka"
                className="h-full w-full object-cover rounded-tl-lg rounded-bl-lg"
              />
            </div>
            {/* right forms area */}
            <div className="h-[100%] w-[60%]">
              {/*  forms navigation */}
              <div className="w-full h-[15%] bg-gray-400">2</div>
              {/*  forms content */}
              <div className="w-full h-[85%]  flex items-center justify-center rounded-br-lg">
                {/* <UserRegistration /> */}
                <UserLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignUpPopup;
