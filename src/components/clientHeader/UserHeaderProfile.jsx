import { TiArrowSortedDown } from "react-icons/ti";

function UserHeaderProfile() {
  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src="user.jpg"
          alt=""
          className="w-[75px] h-[75px] rounded-full border-2 mr-5"
        />
        <h1>Name</h1>
        <TiArrowSortedDown className="text-[30px] ml-1" />
      </div>
    </>
  );
}

export default UserHeaderProfile;
