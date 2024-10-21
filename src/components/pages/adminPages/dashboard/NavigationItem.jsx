import { Link } from "react-router-dom";

function NavigationItem(props) {
  return (
    <div
      className="
      w-[90%] 
      my-[5px]
      py-[5px] pl-[25px] 
      bg-purple-300 hover:bg-purple-900 
      font-semibold text-[30px] text-purple-900 hover:text-white
      flex items-center 
      border-y-4 border-r-4 rounded-r-[50px] border-purple-950 
      shadow-md hover:shadow-lg
      transition duration-300 ease-in-out"
    >
      <props.itemIcon className="mr-[10px]" />
      <Link to={props.itemLink}>{props.itemName}</Link>
    </div>
  );
}

export default NavigationItem;
