import { Link } from "react-router-dom";

function NavigationItem({
  itemName,
  itemIcon: Icon,
  itemLink,
  isActive,
  setActiveItem,
}) {
  return (
    <div>
      <Link
        className={`w-[90%] my-[5px] py-[5px] pl-[25px]
        font-semibold text-[30px] flex items-center 
        border-y-4 border-r-4 rounded-r-[50px] border-purple-950 
        shadow-md transition duration-300 ease-in-out ${
          isActive
            ? "bg-purple-900 text-white shadow-lg"
            : "bg-purple-300 text-purple-900 hover:bg-purple-600 hover:text-white"
        }
        `}
        to={itemLink}
        onClick={() => setActiveItem(itemLink)}
      >
        <Icon className="mr-[10px]" />
        {itemName}
      </Link>
    </div>
  );
}

export default NavigationItem;
