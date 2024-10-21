import NavigationItem from "./NavigationItem";
import { RiDashboardHorizontalFill } from "react-icons/ri";
function NavigationItemList() {
  return (
    <div>
      <NavigationItem itemName="Booking" itemIcon={RiDashboardHorizontalFill} />
    </div>
  );
}

export default NavigationItemList;
