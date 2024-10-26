function ProfileDropDown({ onLogoutClick }) {
  return (
    <div className="relative">
      <div className="absolute right-0  w-60 bg-white border rounded-lg shadow-lg">
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            Profile
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            Settings
          </li>
          <li
            onClick={onLogoutClick}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileDropDown;
