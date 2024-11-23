import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import ProfileDropDown from "./ProfileDropDown";

function LogedInItems({ handleUserLogedOut, user }) {
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  function handleLogoutClick() {
    localStorage.removeItem("token");
    setIsProfileClicked(false);
    handleUserLogedOut();
  }

  return (
    <div>
      <div className="flex justify-center items-center px-6 py-3  text-white text-lg font-semibold rounded-lg shadow-md hover:text-purple-300 transition duration-300 ease-in-out">
        <button
          className="flex justify-center items-center"
          onClick={() => setIsProfileClicked(!isProfileClicked)}
        >
          <div
            className="w-[50px] lg:w-[60px] xl:w-[75px] h-[50px] lg:h-[60px] xl:h-[75px] rounded-full bg-cover bg-center border-4 border-white mr-2 xl:mr-4 hover:border-purple-300"
            style={{ backgroundImage: `url(${user.image})` }}
          ></div>

          <span className="text-[15px] lg:text-[18px] xl:text-[20px]">
            {user.firstName + " " + user.lastName}
          </span>
          <TiArrowSortedDown className="text-[20px] ml-1" />
        </button>
      </div>
      {isProfileClicked && (
        <div>
          <ProfileDropDown
            onLogoutClick={handleLogoutClick}
            setIsProfileClicked={setIsProfileClicked}
          />
        </div>
      )}
    </div>
  );
}

export default LogedInItems;
