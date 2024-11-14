import { useEffect, useState } from "react";
import LogedInItems from "./LogedInItems";
import LogedOutItems from "./LogedOutItems";
import axios from "axios";

function UserHeaderProfile({
  openLoginPopup,
  handleUserLogedOut,
  isUserLoggedIn,
  handleUserLogedIn,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (localUser) {
      setUser(localUser);
      handleUserLogedIn();
    } else if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUser(res.data.user);
          handleUserLogedIn();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isUserLoggedIn]);

  return (
    <div>
      {isUserLoggedIn ? (
        <LogedInItems handleUserLogedOut={handleUserLogedOut} user={user} />
      ) : (
        <LogedOutItems openLoginPopup={openLoginPopup} />
      )}
    </div>
  );
}

export default UserHeaderProfile;
