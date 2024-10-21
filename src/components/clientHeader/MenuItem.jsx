import { Link } from "react-router-dom";

function MenuItem(props) {
  return (
    <div className="text-purple-50 text-[20px] font-bold transition duration-300 ease-in-out hover:text-purple-300 hover:underline">
      <Link to={props.menuLink}>{props.menuName}</Link>
    </div>
  );
}

export default MenuItem;
