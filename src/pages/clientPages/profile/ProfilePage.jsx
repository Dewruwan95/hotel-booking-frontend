import { useEffect, useState } from "react";
import { IoImageSharp } from "react-icons/io5";
import uploadImages from "../../../utils/MediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [image, setImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      // Populate individual fields
      setFirstName(storedUser.firstName);
      setLastName(storedUser.lastName);
      setPhone(storedUser.phone);
      setWhatsApp(storedUser.whatsApp);
      setImage(storedUser.image);
    }
  }, []);

  useEffect(() => {
    if (pendingSubmission && !imageUploading) {
      handleUpdateUser();
    }
  }, [imageUploading]);

  // handle image upload change
  async function handleImageChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsImageLoading(true);
      const promise = uploadImages(selectedFile);
      setImageUploading(true);

      try {
        const imageUrl = await promise;
        setImage(imageUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setIsImageLoading(false);
        setImageUploading(false);
      }
    }
  }

  //-----------------------------------------------------------------
  //!------------------- update user function -----------------------
  //-----------------------------------------------------------------
  async function handleUpdateUser() {
    toast.loading("Updating User...");

    // Check if the image is still uploading
    if (imageUploading) {
      // Set pending submission to submit after image upload
      setPendingSubmission(true);
      return;
    }

    // create new event object
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      whatsApp: whatsApp,
      image: image,
    };

    try {
      const token = localStorage.getItem("token");
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
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update user. Please try again.");
    }
  }

  const handleVerifyEmail = () => {
    alert("Verification email sent! Please check your inbox.");
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-purple-600 font-semibold text-lg">
          Loading user data...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-[120px]">
      <div className="w-full min-h-screen bg-purple-50 py-10 px-5">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-purple-700 text-center mb-6">
            User Profile
          </h1>

          <div className="text-center">
            {isEditing ? (
              <form className="space-y-4">
                {/* image upload input */}
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <input
                      type="file"
                      className="h-[200px] w-[200px] rounded-full absolute inset-0 opacity-0 cursor-pointer z-[10]"
                      onChange={handleImageChange}
                    />
                    <div className="w-[200px] h-[200px] rounded-full bg-purple-300 border-4 border-purple-600 shadow-lg flex justify-center items-center text-purple-600 overflow-hidden">
                      {isImageLoading ? (
                        <span className="text-center text-purple-700">
                          Uploading Image...
                        </span>
                      ) : image ? (
                        <div className="w-[200px] h-[200px] rounded-full">
                          <img
                            src={image}
                            alt="Preview"
                            className="w-[200px] h-[200px] object-cover rounded-full "
                          />
                          <span className="text-center flex rounded-full flex-col items-center justify-center absolute inset-0 z-[9] bg-black bg-opacity-50 text-white px-1">
                            <IoImageSharp className="h-[40px] w-[40px]" />
                            Select or Drag & Drop New Image Here
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-lg font-semibold text-purple-700">
                    First Name:
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border rounded-lg p-2 w-2/3 border-purple-400 focus:ring focus:ring-purple-300"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-lg font-semibold text-purple-700">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border rounded-lg p-2 w-2/3 border-purple-400 focus:ring focus:ring-purple-300"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-lg font-semibold text-purple-700">
                    Phone:
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border rounded-lg p-2 w-2/3 border-purple-400 focus:ring focus:ring-purple-300"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-lg font-semibold text-purple-700">
                    WhatsApp:
                  </label>
                  <input
                    type="text"
                    value={whatsApp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                    className="border rounded-lg p-2 w-2/3 border-purple-400 focus:ring focus:ring-purple-300"
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={handleUpdateUser}
                    className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 mr-4"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={image}
                    alt="User Profile"
                    className="w-[200px] h-[200px] rounded-full object-cover border-4 border-purple-600 shadow-lg"
                  />
                </div>
                <p className="text-xl font-semibold text-purple-800">
                  {firstName} {lastName}
                </p>
                <p className="text-lg text-purple-600">
                  {user.email}{" "}
                  {!user.emailVerified && (
                    <button
                      onClick={handleVerifyEmail}
                      className="ml-2 px-3 py-1 text-sm bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
                    >
                      Verify Email
                    </button>
                  )}
                </p>
                <p className="text-lg text-purple-600">
                  <span className="font-bold">Phone: </span> {phone}
                </p>
                <p className="text-lg text-purple-600">
                  <span className="font-bold">WhatsApp: </span> {whatsApp}
                </p>
                <p className="text-lg text-purple-600">
                  <span className="font-bold">Account Type: </span>{" "}
                  {user.type === "admin" ? "Admin" : "Customer"}
                </p>
                <p className="text-lg text-purple-600">
                  <span className="font-bold">Account Status: </span>
                  {user.disabled ? "Disabled" : "Active"}
                </p>
                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
