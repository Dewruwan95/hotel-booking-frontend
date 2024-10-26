import { TbLogin2 } from "react-icons/tb";
import MenuList from "./MenuList";
import { useState } from "react";
import LoginSignUpPopup from "../userLoginAndRegister/LoginSignUpPopup";
import UserHeaderProfile from "./UserHeaderProfile";

function Header() {
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  // Function to close the popup
  function handleClosePopup() {
    setIsLoginClicked(false);
  }

  return (
    <div>
      <header className=" w-full bg-purple-950 h-[120px] flex items-center justify-around shadow-xl">
        <span className="text-[60px] text-purple-50">Hotel ABC</span>
        <MenuList />
        <button
          className="px-6 py-3  text-white text-lg font-semibold rounded-lg shadow-md 
        hover:text-purple-300 transition duration-300 ease-in-out
        flex items-center"
          onClick={() => {
            setIsLoginClicked(true);
          }}
        >
          {<UserHeaderProfile />}
          <TbLogin2 className="text-[30px] mr-1" />
          Login
        </button>
      </header>

      {isLoginClicked && (
        <div>
          <LoginSignUpPopup onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}

export default Header;
