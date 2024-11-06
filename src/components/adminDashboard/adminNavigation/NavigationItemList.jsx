import { BsBookmarkCheckFill, BsFillDoorOpenFill } from "react-icons/bs";
import NavigationItem from "./NavigationItem";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { IoChatboxEllipses } from "react-icons/io5";
import { PiListStarFill } from "react-icons/pi";
import { IoIosImage } from "react-icons/io";
import { useEffect, useState } from "react";

function NavigationItemList() {
  const [activeItem, setActiveItem] = useState("");

  // Load the active item from localStorage on mount
  useEffect(() => {
    const savedItem = localStorage.getItem("activeNavItem");
    if (savedItem) {
      setActiveItem(savedItem);
    } else {
      setActiveItem("dashboard");
    }
  }, []);

  // Save the active item to localStorage whenever it changes
  function handleSetActiveItem(item) {
    setActiveItem(item);
    localStorage.setItem("activeNavItem", item);
  }

  return (
    <div className="mt-[50px]">
      <NavigationItem
        itemName="Dashboard"
        itemIcon={RiDashboardHorizontalFill}
        itemLink="dashboard"
        isActive={activeItem === "dashboard"}
        setActiveItem={handleSetActiveItem}
      />
      <NavigationItem
        itemName="Bookings"
        itemIcon={BsBookmarkCheckFill}
        itemLink="bookings"
        isActive={activeItem === "bookings"}
        setActiveItem={handleSetActiveItem}
      />
      <NavigationItem
        itemName="Rooms"
        itemIcon={BsFillDoorOpenFill}
        itemLink="rooms"
        isActive={activeItem === "rooms"}
        setActiveItem={handleSetActiveItem}
      />
      <NavigationItem
        itemName="Categories"
        itemIcon={MdCategory}
        itemLink="categories"
        isActive={activeItem === "categories"}
        setActiveItem={handleSetActiveItem}
      />
      <NavigationItem
        itemName="Users"
        itemIcon={ImUsers}
        itemLink="users"
        isActive={activeItem === "users"}
        setActiveItem={handleSetActiveItem}
      />
      <NavigationItem
        itemName="Feedbacks"
        itemIcon={PiListStarFill}
        itemLink="feedbacks"
        isActive={activeItem === "feedbacks"}
        setActiveItem={handleSetActiveItem}
      />
      <NavigationItem
        itemName="Ticketing"
        itemIcon={IoChatboxEllipses}
        itemLink="ticketing"
        isActive={activeItem === "ticketing"}
        setActiveItem={handleSetActiveItem}
      />
      <NavigationItem
        itemName="Gallery"
        itemIcon={IoIosImage}
        itemLink="gallery"
        isActive={activeItem === "gallery"}
        setActiveItem={handleSetActiveItem}
      />
    </div>
  );
}

export default NavigationItemList;
