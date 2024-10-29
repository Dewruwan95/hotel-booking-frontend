import axios from "axios";
import { useState } from "react";
import { FaRegUser, FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { GoKey } from "react-icons/go";
import { IoCreate } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";

function UserRegistration() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // handle image upload change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  // user register function
  async function handleRegister() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          whatsApp: whatsApp,
          image: image,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className=" w-full flex justify-center ">
        <div className="  flex flex-col ">
          {/* image field */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
              <div className="w-24 h-24 bg-purple-300 rounded-full border-[1px] border-gray-400 flex justify-center items-center text-purple-600 overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span>Upload</span>
                )}
              </div>
            </div>
          </div>

          {/* email field */}
          <div className="flex my-4 ">
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

          {/*  name fields */}
          <div className="flex justify-between gap-4">
            {/* first name field */}
            <div className="flex my-4 w-1/2">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <FaRegUser className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="First Name"
                className="] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {/* last name field */}
            <div className="flex my-4 w-1/2">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <FaRegUser className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Last Name"
                className=" h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/*  phone fields */}
          <div className="flex justify-between gap-4">
            {/* phone field */}
            <div className="flex my-4 w-1/2">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <FiPhone className="h-4 w-4" />
              </div>
              <input
                type="tel"
                placeholder="Phone"
                className="] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* whatsApp field */}
            <div className="flex my-4 w-1/2">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <FaWhatsapp className="h-4 w-4" />
              </div>
              <input
                type="tel"
                placeholder="WhatsApp"
                className=" h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
              />
            </div>
          </div>

          {/*  password fields */}
          <div className="flex justify-between gap-4">
            {/* password field */}
            <div className="flex my-4 w-1/2">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <GoKey className="h-4 w-4" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* confirm password field */}
            <div className="flex my-4 w-1/2">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <GoKey className="h-4 w-4" />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                className=" h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="my-4 px-2 w-full">
            <span className=" text-gray-600">
              <input
                type="checkbox"
                className="mr-2"
                defaultValue={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              I accept the&nbsp;
            </span>

            <a href="#" className=" text-purple-500 hover:underline">
              Terms of Service and Privacy Policy
            </a>
          </div>

          {/* button */}
          <div className="my-4">
            <button
              className="w-[505px] h-[40px] bg-purple-600 text-white text-lg 
                      font-semibold rounded-lg shadow-md hover:bg-purple-800 hover:shadow-lg 
                      transition duration-300 ease-in-out flex items-center justify-center"
              onClick={handleRegister}
            >
              <IoCreate className="mr-2" />
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegistration;
