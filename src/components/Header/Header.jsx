import MenuList from "./MenuList";

function Header() {
  return (
    <div>
      <header className="bg-purple-600 w-full h-[120px] flex justify-between items-center shadow-xl pl-[100px]">
        <span className="text-[60px] text-purple-50 ">Hotel ABC</span>
        <MenuList />
        <button className="pr-[100px]">Register</button>
      </header>
    </div>
  );
}

export default Header;
