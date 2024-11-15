import { IoMdCloseCircleOutline } from "react-icons/io";
import UserRegistration from "./UserRegistration";
import UserLogin from "./UserLogin";
import { useState } from "react";

function LoginSignUpPopup({ closeLoginPopup, handleUserLogedIn }) {
  const [userStatus, setUserStatus] = useState("login");

  return (
    <>
      {/*  background */}
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
        {/* component background */}
        <div className="w-[320px] md:w-[600px] lg:w-[950px] lg:h-[650px] bg-purple-50 rounded-lg relative">
          {/* close button */}
          <div>
            <button
              className="h-[40px] w-[40px] absolute bg-purple-50 rounded-full right-[-20px] top-[-20px]
            flex justify-center items-center
            "
              onClick={closeLoginPopup}
            >
              <IoMdCloseCircleOutline className="text-[40px] text-purple-950 hover:text-purple-600" />
            </button>
          </div>

          {/* component body */}
          <div className="flex h-[100%] flex-col items-center lg:flex-row mt-3 lg:mt-0">
            {/* left image area */}
            <div className="h-[100%] w-[40%] hidden lg:block ">
              <img
                src="srilanka.jpg"
                alt="Sri Lanka"
                className="h-full w-full object-cover rounded-tl-lg rounded-bl-lg"
              />
            </div>
            {/* right forms area */}
            <div className="h-[100%] w-[60%] pt-[5px]">
              {/*  forms navigation */}
              <div className="w-full h-[15%] bg-purple-50 flex items-center justify-items-stretch justify-center">
                {/*  login button  */}
                <button
                  className={`h-[50px] w-[250px] bg-purple-200 text-purple-950 font-bold 
                    hover:bg-purple-600 hover:text-white
                rounded-tl-md rounded-bl-md
                ${
                  userStatus === "login"
                    ? "bg-purple-900 text-white"
                    : "bg-purple-200 text-purple-950 hover:bg-purple-500"
                }`}
                  onClick={() => {
                    setUserStatus("login");
                  }}
                >
                  Login
                </button>

                {/*  register button  */}
                <button
                  className={`h-[50px] w-[250px] bg-purple-200 text-purple-950 font-bold 
                  hover:bg-purple-600 hover:text-white
                rounded-tr-md rounded-br-md
                ${
                  userStatus === "register"
                    ? "bg-purple-900 text-white"
                    : "bg-purple-200 text-purple-950 hover:bg-purple-500"
                }`}
                  onClick={() => setUserStatus("register")}
                >
                  Sign Up
                </button>
              </div>
              {/*  forms content */}
              <div className="w-full h-[85%] rounded-br-lg pt-3 lg:pt-0">
                {userStatus === "register" ? (
                  <UserRegistration setUserStatus={setUserStatus} />
                ) : (
                  <UserLogin handleUserLogedIn={handleUserLogedIn} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignUpPopup;
