import { BsBookmarkCheckFill, BsFillDoorOpenFill } from "react-icons/bs";
import NavigationItem from "./NavigationItem";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { IoChatboxEllipses } from "react-icons/io5";
import { PiListStarFill } from "react-icons/pi";
import { IoIosImage } from "react-icons/io";
function NavigationItemList() {
  return (
    <div className="mt-[50px]">
      <NavigationItem
        itemName="Dashboard"
        itemIcon={RiDashboardHorizontalFill}
        itemLink="dashboard"
      />
      <NavigationItem
        itemName="Bookings"
        itemIcon={BsBookmarkCheckFill}
        itemLink="bookings"
      />
      <NavigationItem
        itemName="Rooms"
        itemIcon={BsFillDoorOpenFill}
        itemLink="rooms"
      />
      <NavigationItem
        itemName="Categories"
        itemIcon={MdCategory}
        itemLink="categories"
      />
      <NavigationItem itemName="Users" itemIcon={ImUsers} itemLink="users" />
      <NavigationItem
        itemName="Feedbacks"
        itemIcon={PiListStarFill}
        itemLink="feedbacks"
      />
      <NavigationItem
        itemName="Ticketing"
        itemIcon={IoChatboxEllipses}
        itemLink="ticketing"
      />
      <NavigationItem
        itemName="Gallery"
        itemIcon={IoIosImage}
        itemLink="gallery"
      />
    </div>
  );
}

export default NavigationItemList;
