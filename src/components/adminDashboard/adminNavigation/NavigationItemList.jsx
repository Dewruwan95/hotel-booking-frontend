import { BsBookmarkCheckFill, BsFillDoorOpenFill } from "react-icons/bs";
import NavigationItem from "./NavigationItem";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { IoChatboxEllipses } from "react-icons/io5";
import { PiListStarFill } from "react-icons/pi";
import { IoIosImage } from "react-icons/io";
import { useState } from "react";

function NavigationItemList() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="mt-[50px]">
      <NavigationItem
        itemName="Dashboard"
        itemIcon={RiDashboardHorizontalFill}
        itemLink="dashboard"
        isActive={activeItem === "dashboard"}
        setActiveItem={setActiveItem}
      />
      <NavigationItem
        itemName="Bookings"
        itemIcon={BsBookmarkCheckFill}
        itemLink="bookings"
        isActive={activeItem === "bookings"}
        setActiveItem={setActiveItem}
      />
      <NavigationItem
        itemName="Rooms"
        itemIcon={BsFillDoorOpenFill}
        itemLink="rooms"
        isActive={activeItem === "rooms"}
        setActiveItem={setActiveItem}
      />
      <NavigationItem
        itemName="Categories"
        itemIcon={MdCategory}
        itemLink="categories"
        isActive={activeItem === "categories"}
        setActiveItem={setActiveItem}
      />
      <NavigationItem
        itemName="Users"
        itemIcon={ImUsers}
        itemLink="users"
        isActive={activeItem === "users"}
        setActiveItem={setActiveItem}
      />
      <NavigationItem
        itemName="Feedbacks"
        itemIcon={PiListStarFill}
        itemLink="feedbacks"
        isActive={activeItem === "feedbacks"}
        setActiveItem={setActiveItem}
      />
      <NavigationItem
        itemName="Ticketing"
        itemIcon={IoChatboxEllipses}
        itemLink="ticketing"
        isActive={activeItem === "ticketing"}
        setActiveItem={setActiveItem}
      />
      <NavigationItem
        itemName="Gallery"
        itemIcon={IoIosImage}
        itemLink="gallery"
        isActive={activeItem === "gallery"}
        setActiveItem={setActiveItem}
      />
    </div>
  );
}

export default NavigationItemList;
