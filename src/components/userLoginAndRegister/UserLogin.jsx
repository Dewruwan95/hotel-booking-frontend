import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoKey } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function UserLogin({ handleUserLogedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail || rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  //------------------------------------------------------------------
  ///--------------------------- email validation --------------------
  //------------------------------------------------------------------
  function validateEmail() {
    if (!email) {
      setEmailError("Email is required.");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  }

  //-----------------------------------------------------------------
  ///-------------------------- password validation -----------------
  //-----------------------------------------------------------------
  function validatePassword() {
    const minLength = 8;

    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < minLength) {
      setPasswordError(`must be at least ${minLength} characters.`);
    } else {
      setPasswordError("");
    }
  }

  //------------------------------------------------------------------
  //!---------------------- handle login function --------------------
  //------------------------------------------------------------------
  async function handleLogin(e) {
    e.preventDefault();
    // Validate all fields before sending the request
    validateEmail();
    validatePassword();

    // Check if there are any validation errors
    if (emailError || passwordError) {
      console.log("Please fix the errors before submitting.");
      return; // Prevents submission if there are validation errors
    }

    try {
      setProcessing(true);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      if (res.data.user) {
        handleUserLogedIn();
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("userType", res.data.user.type);

        // Save email and password if remember me is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }

        if (res.data.user.type === "admin") {
          navigate("/admin/dashboard");
        } else if (res.data.user.type === "customer") {
          window.location.href = "/";
        }
        toast.success("Login successful.");
      } else {
        toast.error("Login failed. Please try again.");
        setEmailError("Increct email or password.");
        setPasswordError("Increct email or password.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className=" w-full flex justify-center">
          <div className="flex flex-col items-center md:items-start">
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- email field ---------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="flex my-4">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <MdAlternateEmail className="h-4 w-4" />
              </div>
              <input
                type="email"
                placeholder="Email"
                autoComplete="true"
                required={true}
                className="w-[250px] md:w-[460px] h-[45px] px-[10px] py-[5px] rounded-l-[0px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={email}
                onBlur={validateEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-[295px] md:w-[505px] flex flex-col items-start ">
              {/* Display error message if email is invalid */}
              {emailError && (
                <div className="text-red-500 text-sm mt-[-15px] mb-[-5px] ml-[50px]">
                  {emailError}
                </div>
              )}
            </div>
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- password field ------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="flex my-4">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <GoKey className="h-4 w-4" />
              </div>
              <input
                type="password"
                placeholder="Password"
                autoComplete="true"
                required={true}
                className="w-[250px] md:w-[460px] h-[45px] px-[10px] py-[5px] rounded-l-[0px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={password}
                onBlur={validatePassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateEmail();
                }}
              />
            </div>
            <div className="w-[295px] md:w-[505px] flex flex-col items-start ">
              {/* Display error message if password is invalid */}
              {passwordError && (
                <div className="text-red-500 text-sm mt-[-15px] mb-[-5px] ml-[50px]">
                  {passwordError}
                </div>
              )}
            </div>
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///----------------------------- Remember me & Forgot Password -------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="my-4 px-[5px] md:px-8 flex justify-between w-full">
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
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- login button --------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="my-4">
              {!processing ? (
                <button
                  type="submit"
                  className="w-[295px] md:w-[505px] h-[40px] bg-purple-600 text-white text-lg
                        font-semibold rounded-lg shadow-md hover:bg-purple-800 hover:shadow-lg
                        transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <TbLogin2 className="mr-2" />
                  Login
                </button>
              ) : (
                <button
                  className="w-[295px] md:w-[505px] h-[40px] bg-purple-600 text-white text-lg
                             font-semibold rounded-lg shadow-md flex items-center justify-center"
                  disabled
                >
                  <AiOutlineLoading3Quarters className="mr-2 animate-spin font-bold	" />
                  Processing...
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserLogin;
