import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboardProfile({ userLogedIn }) {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.user) {
            setUserName(res.data.user.firstName + " " + res.data.user.lastName);
            setUserImage(
              res.data.user.image ? res.data.user.image : "user.jpg"
            );
            userLogedIn();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-white">
      <img
        src={userImage}
        alt="User Image"
        className="w-[100px] h-[100px] rounded-full border-5 border-white"
      />
      <span className="text-[30px] font-bold mt-2">{userName}</span>
      <span className="text-[20px] font-light">{`(Administrator)`}</span>
    </div>
  );
}

export default AdminDashboardProfile;
