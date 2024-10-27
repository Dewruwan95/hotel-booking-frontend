import { useEffect, useState } from "react";
import LogedInItems from "./LogedInItems";
import LogedOutItems from "./LogedOutItems";
import axios from "axios";

function UserHeaderProfile() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
          setUser(res.data.user);
          setIsUserLoggedIn(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function handleUserLogedIn() {
    setIsUserLoggedIn(true);
  }
  function handleUserLogedOut() {
    setIsUserLoggedIn(false);
  }

  return (
    <div>
      {isUserLoggedIn ? (
        <LogedInItems onLogout={handleUserLogedOut} user={user} />
      ) : (
        <LogedOutItems onLogin={handleUserLogedIn} />
      )}
    </div>
  );
}

export default UserHeaderProfile;
