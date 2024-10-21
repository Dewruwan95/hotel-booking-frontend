import MenuList from "./MenuList";

function Header() {
  return (
    <div>
      <header className=" w-full bg-purple-950 h-[120px] flex items-center justify-around shadow-xl">
        <span className="text-[60px] text-purple-50">Hotel ABC</span>
        <MenuList />
        <button className="px-6 py-3 bg-purple-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-800 hover:shadow-lg transition duration-300 ease-in-out">
          Register
        </button>
      </header>
    </div>
  );
}

export default Header;
