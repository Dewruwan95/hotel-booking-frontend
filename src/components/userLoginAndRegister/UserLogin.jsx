import axios from "axios";
import { useState } from "react";
import { GoKey } from "react-icons/go";
import { IoMdLogIn } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  function handleLogin() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) {
          if (res.data.user.type === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="bg-white w-full h-[100vh] flex items-center justify-center">
        <div className="  flex flex-col   ">
          {/* email field */}
          <div className="flex my-4">
            <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
              <MdAlternateEmail className="h-4 w-4" />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-[460px] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password field */}
          <div className="flex my-4">
            <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
              <GoKey className="h-4 w-4" />
            </div>

            <input
              type="password"
              placeholder="Password"
              className="w-[460px] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember me & Forgot Password */}
          <div className="my-4 px-8 flex justify-between w-full">
            <span className=" text-gray-600">
              <input
                type="checkbox"
                className="mr-2"
                defaultValue={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </span>

            <a href="#" className=" text-purple-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* button */}
          <div className="my-4">
            <button
              className="w-[505px] h-[40px] bg-purple-600 text-white text-lg 
                      font-semibold rounded-lg shadow-md hover:bg-purple-800 hover:shadow-lg 
                      transition duration-300 ease-in-out flex items-center justify-center"
              onClick={handleLogin}
            >
              <IoMdLogIn className="mr-2" />
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
