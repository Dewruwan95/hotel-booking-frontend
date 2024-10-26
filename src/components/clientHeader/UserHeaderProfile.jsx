import { useState } from "react";
import LogedInItems from "./LogedInItems";
import LogedOutItems from "./LogedOutItems";

function UserHeaderProfile() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return <div>{isUserLoggedIn ? <LogedInItems /> : <LogedOutItems />}</div>;
}

export default UserHeaderProfile;
