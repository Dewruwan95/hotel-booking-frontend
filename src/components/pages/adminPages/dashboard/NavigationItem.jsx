import { Link } from "react-router-dom";

function NavigationItem(props) {
  return (
    <div
      className="w-[90%] text-white text-[30px] hover:bg-purple-800 flex items-center border-y-4 border-r-4 border-purple-950 rounded-r-[50px]



"
    >
      <props.itemIcon />
      <Link to="admin/booking">{props.itemName}</Link>
    </div>
  );
}

export default NavigationItem;
