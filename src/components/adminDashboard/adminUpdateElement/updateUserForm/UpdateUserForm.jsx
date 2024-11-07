import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateUserForm() {
  // check if state is available
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/admin/users";
  }

  // check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const user = location.state.data;

  const image = user.image;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const phone = user.phone;
  const whatsApp = user.whatsApp;
  const emailVerifiey = user.emailVerifiey;
  const [type, setType] = useState(user.type);
  const [isDisabled, setIsDisabled] = useState(user.disabled);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  function handleStatusChange(e) {
    setIsDisabled(e.target.value === "true");
  }

  async function handleUpdateUser() {
    setProcessing(true);
    toast.loading("Updating User...");

    // create new user object
    const updatedUser = {
      email: email,
      type: type,
      disabled: isDisabled,
    };

    console.log(updatedUser);

    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/users",
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      toast.dismiss();
      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update user. Please try again.");
    } finally {
      setProcessing(false);
    }
  }
  return (
    <div>
      <div className="w-full h-full flex flex-col justify-center items-center pt-[100px]">
        <div className="w-[650px] h-[250px] flex z-20">
          <div className="w-[250px] h-[250px] bg-purple-950 rounded-tl-full rounded-bl-full">
            {/* user image */}
            <div
              className="w-[250px] h-[250px] rounded-full bg-purple-600 border-8 border-purple-950 bg-cover bg-center "
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
          <div className="w-[400px] h-[250px] bg-purple-950 text-[20px] font-semibold rounded-tr-[20px] rounded-br-[20px] flex">
            <div className="w-[120px] h-[250px] text-purple-300 flex flex-col justify-center">
              {/* user details titles */}
              <div className="flex flex-col items-end">
                <span className="my-2">Name :</span>
                <span className="my-2">Email :</span>
                <span className="my-2">Phone :</span>
                <span className="my-2">WhatsApp :</span>
                <span className="my-2">Verification :</span>
              </div>
            </div>
            <div className="w-[280px] h-[250px] text-gray-300 flex flex-col justify-center">
              {/* user details values */}
              <div className="flex flex-col">
                <span className="ml-2 my-2">{firstName + " " + lastName}</span>{" "}
                <span className="ml-2 my-2">{email}</span>
                <span className="ml-2 my-2">{phone}</span>
                <span className="ml-2 my-2">{whatsApp}</span>
                <span className="ml-2 my-2">
                  {emailVerifiey === true ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[650px] h-[375px] bg-purple-950 -mt-[125px] z-0  rounded-bl-[20px] rounded-br-[20px]">
          <div className="w-full h-[125px] "></div>
          <div className="w-full h-[250px] flex flex-col justify-center items-center">
            {/* user type dropdown */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-[20px] font-semibold">
                <span className="mr-2 text-purple-100">User Type :</span>
                <select
                  value={type}
                  onChange={handleTypeChange}
                  className="px-4 py-2 bg-purple-600 font-bold rounded-md text-white w-[200px]"
                >
                  <option value={"customer"} className="text-green-500">
                    Customer
                  </option>
                  <option value={"admin"} className="text-orange-500">
                    Administrator
                  </option>
                </select>
              </div>
            </div>
            {/* user status dropdown */}
            <div className="flex flex-col items-center justify-center mt-[30px]">
              <div className="text-[20px] font-semibold">
                <span className="mr-[6px] text-purple-100">User State :</span>
                <select
                  value={isDisabled}
                  onChange={handleStatusChange}
                  className="px-4 py-2 bg-purple-600 font-bold rounded-md text-white w-[200px]"
                >
                  <option value={false} className="text-green-500">
                    Active
                  </option>
                  <option value={true} className="text-orange-500">
                    Banned
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/*----------------------------------------------------------------------------------------------*/}
        {/*///------------------------------------ update user button -----------------------------------*/}
        {/*----------------------------------------------------------------------------------------------*/}
        <div className="my-4">
          {!processing ? (
            <button
              onClick={handleUpdateUser}
              className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800"
            >
              <GrUpdate className="mr-2" />
              Update User
            </button>
          ) : (
            <button
              className="w-[505px] h-[40px] bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-md flex items-center justify-center"
              disabled
            >
              <AiOutlineLoading3Quarters className="mr-2 animate-spin font-bold" />
              Processing...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateUserForm;
