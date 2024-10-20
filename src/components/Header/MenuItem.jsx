import { Link } from "react-router-dom";

function MenuItem(props) {
  return (
    <div className="text-purple-50 text-[20px] font-bold ">
      <Link to={props.menuLink}>{props.menuName}</Link>
    </div>
  );
}

export default MenuItem;
