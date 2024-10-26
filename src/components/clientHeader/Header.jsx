import MenuList from "./MenuList";
import UserHeaderProfile from "./UserHeaderProfile";

function Header() {
  return (
    <div>
      <header className=" w-full bg-purple-950 h-[120px] flex items-center justify-around shadow-xl">
        <span className="text-[60px] text-purple-50">Hotel ABC</span>
        <MenuList />
        <UserHeaderProfile />
      </header>
    </div>
  );
}

export default Header;
