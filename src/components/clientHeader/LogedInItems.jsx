import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import ProfileDropDown from "./ProfileDropDown";

function LogedInItems({ onLogout, user }) {
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  function handleLogoutClick() {
    localStorage.removeItem("token");
    setIsProfileClicked(false);
    onLogout();
  }

  return (
    <div>
      <div className="flex justify-center items-center px-6 py-3  text-white text-lg font-semibold rounded-lg shadow-md hover:text-purple-300 transition duration-300 ease-in-out">
        <button
          className="flex justify-center items-center"
          onClick={() => setIsProfileClicked(!isProfileClicked)}
        >
          <img
            src={user.image}
            alt=""
            className="w-[75px] h-[75px] rounded-full border-4 border-white mr-5 hover:border-purple-300 "
          />
          <span>{user.firstName + " " + user.lastName}</span>
          <TiArrowSortedDown className="text-[30px] ml-1" />
        </button>
      </div>
      {isProfileClicked && (
        <div>
          <ProfileDropDown onLogoutClick={handleLogoutClick} />
        </div>
      )}
    </div>
  );
}

export default LogedInItems;
