import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import ProfileDropDown from "./ProfileDropDown";

function LogedInItems() {
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  function handleLogoutClick() {
    setIsProfileClicked(false);
  }

  return (
    <div>
      <div className="flex justify-center items-center px-6 py-3  text-white text-lg font-semibold rounded-lg shadow-md">
        <button
          className="flex justify-center items-center"
          onClick={() => setIsProfileClicked(!isProfileClicked)}
        >
          <img
            src="user.jpg"
            alt=""
            className="w-[75px] h-[75px] rounded-full border-2 mr-5"
          />
          <h1>Name</h1>
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
