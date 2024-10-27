import { useState } from "react";
import LoginSignUpPopup from "../userLoginAndRegister/LoginSignUpPopup";
import { TbLogin2 } from "react-icons/tb";

function LogedOutItems({ onLogin }) {
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  // Function to close the popup
  function handleClosePopup() {
    setIsLoginClicked(false);
  }
  return (
    <div>
      <button
        className="px-6 py-3  text-white text-lg font-semibold rounded-lg shadow-md hover:text-purple-300 transition duration-300 ease-in-out
        flex items-center"
        onClick={() => {
          setIsLoginClicked(true);
        }}
      >
        <TbLogin2 className="text-[30px] mr-1" />
        Login / Sign Up
      </button>
      {isLoginClicked && (
        <div>
          <LoginSignUpPopup onClose={handleClosePopup} onLogin={onLogin} />
        </div>
      )}
    </div>
  );
}

export default LogedOutItems;
