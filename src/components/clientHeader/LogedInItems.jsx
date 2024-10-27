import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import ProfileDropDown from "./ProfileDropDown";
import axios from "axios";

function LogedInItems({ onLogout }) {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("user.jpg");
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUserName(res.data.user.firstName + " " + res.data.user.lastName);
          if (res.data.user.image) {
            setUserImage(res.data.user.image);
          }
          setUserFound(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setUserName("");
    }
  }, [userFound]);

  function handleLogoutClick() {
    localStorage.removeItem("token");
    setUserFound(false);
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
            src={userImage}
            alt=""
            className="w-[75px] h-[75px] rounded-full border-4 border-white mr-5 hover:border-purple-300 "
          />
          <span>{userName}</span>
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
