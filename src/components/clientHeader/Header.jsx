import { GiHamburgerMenu } from "react-icons/gi";
import MenuList from "./MenuList";
import UserHeaderProfile from "./UserHeaderProfile";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <header className=" w-full bg-purple-950 h-[70px] flex items-center justify-around shadow-xl">
        {/* hamburger button */}
        <div>
          <button onClick={toggleDrawer} className="text-[30px] text-purple-50">
            <GiHamburgerMenu />
          </button>
        </div>
        <div>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="left"
            className="bg-purple-500"
          >
            <div className="bg-purple-950 w-full h-full">
              <MenuList />
            </div>
          </Drawer>
        </div>
        <span className="text-[30px] text-purple-50">Hotel ABC</span>
        <div className="hidden">
          <MenuList />
        </div>
        <UserHeaderProfile />
      </header>
    </div>
  );
}

export default Header;
