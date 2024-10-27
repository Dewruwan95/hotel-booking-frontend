import { useState } from "react";
import LogedInItems from "./LogedInItems";
import LogedOutItems from "./LogedOutItems";

function UserHeaderProfile() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  function handleUserLogedIn() {
    setIsUserLoggedIn(true);
    console.log(isUserLoggedIn);
  }
  function handleUserLogedOut() {
    setIsUserLoggedIn(false);
  }

  return (
    <div>
      {isUserLoggedIn ? (
        <LogedInItems onLogout={handleUserLogedOut} />
      ) : (
        <LogedOutItems onLogin={handleUserLogedIn} />
      )}
    </div>
  );
}

export default UserHeaderProfile;
