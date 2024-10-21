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
    <div>
      <NavigationItem
        itemName="Dashboard"
        itemIcon={RiDashboardHorizontalFill}
        itemLink="admin/dashboard"
      />
      <NavigationItem
        itemName="Bookings"
        itemIcon={BsBookmarkCheckFill}
        itemLink="admin/booking"
      />
      <NavigationItem
        itemName="Rooms"
        itemIcon={BsFillDoorOpenFill}
        itemLink="admin/rooms"
      />
      <NavigationItem
        itemName="Categories"
        itemIcon={MdCategory}
        itemLink="admin/categories"
      />
      <NavigationItem
        itemName="Users"
        itemIcon={ImUsers}
        itemLink="admin/users"
      />
      <NavigationItem
        itemName="Feedbacks"
        itemIcon={PiListStarFill}
        itemLink="admin/feedback"
      />
      <NavigationItem
        itemName="Ticketing"
        itemIcon={IoChatboxEllipses}
        itemLink="admin/ticketing"
      />
      <NavigationItem
        itemName="Gallery"
        itemIcon={IoIosImage}
        itemLink="admin/gallery"
      />
    </div>
  );
}

export default NavigationItemList;
