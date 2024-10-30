import axios from "axios";
import { useState } from "react";
import { FaRegUser, FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { GoKey } from "react-icons/go";
import { IoCreate } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import uploadImage from "../../utils/MediaUpload";
import { LuCamera } from "react-icons/lu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CustomAlert from "../customAlert/CustomAlert";

function UserRegistration({ setUserStatus }) {
  const [image, setImage] = useState("user.jpg");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [whatsAppError, setWhatsAppError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // handle image upload change ---------------------------------------------------------
  async function handleImageChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsImageLoading(true);
      const imageUrl = await uploadImage(selectedFile);
      setImage(imageUrl);
      setImagePreview(URL.createObjectURL(selectedFile));
      setIsImageLoading(false);
    }
  }

  //---------------------------------------------------------------------------------
  //*--------------------------- fields validation functions ------------------------
  //---------------------------------------------------------------------------------

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

  //------------------------------------------------------------------
  ///--------------------------- first name validation ---------------
  //------------------------------------------------------------------

  function validateFirstName() {
    if (!firstName) {
      setFirstNameError("First name is required.");
    } else {
      setFirstNameError("");
    }
  }

  //------------------------------------------------------------------
  ///--------------------------- mobile number validation ------------
  //------------------------------------------------------------------
  function validateMobileNumber() {
    if (!phone) {
      setMobileNumberError("Mobile is required.");
    } else if (!/^\d{10}$/.test(phone)) {
      // Adjust the regex if needed
      setMobileNumberError("Invalid! Enter valid number.");
    } else {
      setMobileNumberError("");
    }
  }

  //------------------------------------------------------------------
  ///--------------------------- whatsapp number validation ----------
  //------------------------------------------------------------------
  function validateWhatsAppNumber() {
    if (!whatsApp) {
      setWhatsAppError("WhatsApp is required.");
    } else if (!/^\d{10}$/.test(whatsApp)) {
      setWhatsAppError("Invalid! Enter valid number.");
    } else {
      setWhatsAppError("");
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

  //-----------------------------------------------------------------
  ///------------------ confirm password validation -----------------
  //-----------------------------------------------------------------
  function validateConfirmPassword() {
    const minLength = 8;

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm password.");
    } else if (password.length < minLength) {
      setPasswordError(`must be at least ${minLength} characters.`);
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }

  //-----------------------------------------------------------------
  ///---------------------- clear all fields ------------------------
  //-----------------------------------------------------------------
  function clearAll() {
    setImage("user.jpg");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setWhatsApp("");
    setPassword("");
    setConfirmPassword("");
    setAgreeTerms(false);
    setImagePreview(null);
    setEmailError("");
    setFirstNameError("");
    setMobileNumberError("");
    setWhatsAppError("");
    setPasswordError("");
    setConfirmPasswordError("");
  }

  //-----------------------------------------------------------------
  //!------------------ user register function ----------------------
  //-----------------------------------------------------------------
  async function handleRegister() {
    // Check if the image is still uploading
    if (isImageLoading) {
      console.log("Please wait, image is still uploading...");
      return; // Prevents submission until the upload is done
    }

    // Validate all fields before sending the request
    validateEmail();
    validateFirstName();
    validateMobileNumber();
    validateWhatsAppNumber();
    validatePassword();
    validateConfirmPassword();

    // Check if there are any validation errors
    if (
      emailError ||
      firstNameError ||
      mobileNumberError ||
      whatsAppError ||
      passwordError ||
      confirmPasswordError
    ) {
      console.log("Please fix the errors before submitting.");
      return; // Prevents submission if there are validation errors
    }

    try {
      setProcessing(true);
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
      setAlertMessage(
        "Your Account has been created successfully. You can login now."
      );
      clearAll();
      setAlertVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false); // Reset processing to false after registration is complete
    }
  }

  return (
    <>
      <div className=" w-full flex justify-center ">
        <div className="  flex flex-col ">
          {/*----------------------------------------------------------------------------------------------*/}
          {/*///--------------------------------------- image field ---------------------------------------*/}
          {/*----------------------------------------------------------------------------------------------*/}
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
                ) : isImageLoading ? (
                  <span className="text-center">Loading...</span>
                ) : (
                  <span className="text-center flex flex-col items-center">
                    <LuCamera className="h-5 w-5" />
                    Upload Image
                  </span>
                )}
              </div>
            </div>
          </div>

          {/*----------------------------------------------------------------------------------------------*/}
          {/*///--------------------------------------- email field ---------------------------------------*/}
          {/*----------------------------------------------------------------------------------------------*/}
          <div className="flex my-4 ">
            <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
              <MdAlternateEmail className="h-4 w-4" />
            </div>

            <input
              type="email"
              placeholder="Email"
              required
              className="w-[460px] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
              defaultValue={email}
              onBlur={validateEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Display error message if email is invalid */}
          {emailError && (
            <div className="text-red-500 text-sm mt-[-15px] mb-[-5px] ml-[50px]">
              {emailError}
            </div>
          )}
          {/*----------------------------------------------------------------------------------------------*/}
          {/*//*--------------------------------------- name field ----------------------------------------*/}
          {/*----------------------------------------------------------------------------------------------*/}
          <div className="flex justify-between gap-4">
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- first name field ----------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="w-1/2">
              <div className="flex my-4">
                <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                  <FaRegUser className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  defaultValue={firstName}
                  onBlur={validateFirstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    validateEmail();
                  }}
                />
              </div>
              {/* Display error message if first name is not provided */}
              {firstNameError && (
                <div className="text-red-500 text-sm mt-[-15px] mb-[-5px] ml-[50px]">
                  {firstNameError}
                </div>
              )}
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- last name field -----------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="flex my-4 w-1/2">
              <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <FaRegUser className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Last Name"
                className=" h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                defaultValue={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  validateEmail();
                  validateFirstName();
                }}
              />
            </div>
          </div>

          {/*----------------------------------------------------------------------------------------------*/}
          {/*//*--------------------------------------- phone fields --------------------------------------*/}
          {/*----------------------------------------------------------------------------------------------*/}
          <div className="flex justify-between gap-4">
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- mobile phone field --------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="w-1/2">
              <div className="flex my-4">
                <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                  <FiPhone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  defaultValue={phone}
                  onBlur={validateMobileNumber}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    validateEmail();
                    validateFirstName();
                  }}
                />
              </div>
              {/* Display error message if mobile number is not valid */}
              {mobileNumberError && (
                <div className="text-red-500 text-sm mt-[-15px] mb-[-5px] ml-[50px]">
                  {mobileNumberError}
                </div>
              )}
            </div>
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- whatsApp field ------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="w-1/2">
              <div className="flex my-4">
                <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                  <FaWhatsapp className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  placeholder="WhatsApp"
                  className=" h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  defaultValue={whatsApp}
                  onBlur={validateWhatsAppNumber}
                  onChange={(e) => {
                    setWhatsApp(e.target.value);
                    validateEmail();
                    validateFirstName();
                    validateMobileNumber();
                  }}
                />
              </div>
              {/* Display error message if whatsapp number is not valid */}
              {whatsAppError && (
                <div className="text-red-500 text-sm mt-[-15px] mb-[-5px] ml-[50px]">
                  {whatsAppError}
                </div>
              )}
            </div>
          </div>

          {/*----------------------------------------------------------------------------------------------*/}
          {/*//*--------------------------------------- password fields -----------------------------------*/}
          {/*----------------------------------------------------------------------------------------------*/}
          <div className="flex justify-between gap-4">
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- password field ------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="w-1/2">
              <div className="flex my-4">
                <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                  <GoKey className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  defaultValue={password}
                  onBlur={validatePassword}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateEmail();
                    validateFirstName();
                    validateMobileNumber();
                    validateWhatsAppNumber();
                  }}
                />
              </div>
              {/* Display error message if password is not valid */}
              {passwordError && (
                <div className="text-red-500 text-sm mt-[-15px] mb-[-5px] ml-[50px]">
                  {passwordError}
                </div>
              )}
            </div>
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------------- confirm password field ----------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="w-1/2">
              <div className="flex my-4">
                <div className=" bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                  <GoKey className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className=" h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  defaultValue={confirmPassword}
                  onBlur={validateConfirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateEmail();
                    validateFirstName();
                    validateMobileNumber();
                    validateWhatsAppNumber();
                    validatePassword();
                  }}
                />
              </div>
              {/* Display error message if password is not valid */}
              {confirmPasswordError == "Passwords match" ? (
                <div className="text-green-500 text-sm mt-[-15px] mb-[-5px] ml-[50px]">
                  {confirmPasswordError}
                </div>
              ) : (
                <div className="text-red-500 text-sm my-[-15px] ml-[50px]">
                  {confirmPasswordError}
                </div>
              )}
            </div>
          </div>

          {/*----------------------------------------------------------------------------------------------*/}
          {/*///--------------------------------------- license agreement field ---------------------------*/}
          {/*----------------------------------------------------------------------------------------------*/}
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

          {/*----------------------------------------------------------------------------------------------*/}
          {/*///--------------------------------------- sign up button ------------------------------------*/}
          {/*----------------------------------------------------------------------------------------------*/}
          <div className="my-4">
            {!processing ? (
              <button
                className={`w-[505px] h-[40px] text-white text-lg 
                  font-semibold rounded-lg shadow-md  hover:shadow-lg 
                  transition duration-300 ease-in-out flex items-center justify-center ${
                    agreeTerms
                      ? "bg-purple-600 hover:bg-purple-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                onClick={handleRegister}
                disabled={!agreeTerms}
              >
                <IoCreate className="mr-2" />
                Sign Up
              </button>
            ) : (
              //--------------------------------------------------------------------------------------------
              ///--------------------------------------- processing buttom ---------------------------------
              //--------------------------------------------------------------------------------------------
              <button
                className="w-[505px] h-[40px] bg-purple-600 text-white text-lg 
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
      {/* visible custom alert message */}
      {alertVisible && (
        <CustomAlert
          message={alertMessage}
          onClose={() => {
            setAlertVisible(false);
            setUserStatus("login");
          }}
        />
      )}
    </>
  );
}

export default UserRegistration;
