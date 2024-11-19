import { BsBookmarkCheckFill, BsFillDoorOpenFill } from "react-icons/bs";
import NavigationItem from "./NavigationItem";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { IoChatboxEllipses } from "react-icons/io5";
import { PiListStarFill } from "react-icons/pi";
import { IoIosImage } from "react-icons/io";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function NavigationItemList() {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  const pathToNavItemMap = {
    "/admin/dashboard": "dashboard",
    "/admin/bookings": "bookings",
    "/admin/rooms": "rooms",
    "/admin/add-room": "rooms",
    "/admin/update-room": "rooms",
    "/admin/categories": "categories",
    "/admin/add-category": "categories",
    "/admin/update-category": "categories",
    "/admin/users": "users",
    "/admin/update-user": "users",
    "/admin/feedbacks": "feedbacks",
    "/admin/update-feedback": "feedbacks",
    "/admin/ticketing": "ticketing",
    "/admin/gallery": "gallery",
    "/admin/add-event": "gallery",
    "/admin/update-event": "gallery",
  };

  // Load the active item from localStorage on mount
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedNavItem = Object.keys(pathToNavItemMap).find((path) =>
      currentPath.startsWith(path)
    );
    if (matchedNavItem) {
      setActiveItem(pathToNavItemMap[matchedNavItem]);
      localStorage.setItem("activeNavItem", pathToNavItemMap[matchedNavItem]);
    }
  }, [location.pathname]);

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
