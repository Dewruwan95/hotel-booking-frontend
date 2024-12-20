import { useNavigate } from "react-router-dom";
import uploadImages from "../../../../utils/MediaUpload";
import { useEffect, useState } from "react";
import { IoImageSharp } from "react-icons/io5";
import { MdEmojiEvents } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

function AddEventForm() {
  // check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadPromise, setUploadPromise] = useState(null);
  const [pendingSubmission, setPendingSubmission] = useState(false);

  // useEffect to check when uploadPromise is completed and form submit if pending
  useEffect(() => {
    if (!uploadPromise && pendingSubmission) {
      handleAddEvent();
      setPendingSubmission(false);
    }
  }, [uploadPromise, pendingSubmission]);

  const navigate = useNavigate();

  // handle image upload change ---------------------------------------------------------
  async function handleImageChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsImageLoading(true);
      const promise = uploadImages(selectedFile);
      setUploadPromise(promise);

      try {
        const imageUrl = await promise;
        setImage(imageUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setIsImageLoading(false);
        setUploadPromise(null);
      }
    }
  }

  //-----------------------------------------------------------------
  //!--------------------- add event function -----------------------
  //-----------------------------------------------------------------
  async function handleAddEvent() {
    setProcessing(true);
    toast.loading("Creating Event...");

    // Check if the image is still uploading
    if (uploadPromise) {
      // Set pending submission to submit after image upload
      setPendingSubmission(true);
      return;
    }

    try {
      // create new event object
      const newEvent = {
        name: name,
        description: description,
        image: !image
          ? "https://firebasestorage.googleapis.com/v0/b/mern-hotel-management.appspot.com/o/image.png?alt=media&token=0f157e0a-29be-4da3-90a6-6c9eb54720e4"
          : image,
      };

      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/events",
        newEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      toast.dismiss();
      toast.success("Event created successfully");
      navigate("/admin/gallery");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to create event. Please try again.");
    } finally {
      setProcessing(false);
    }
  }
  return (
    <div>
      <div className="w-full h-full flex justify-center pt-[70px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddEvent();
          }}
        >
          <div className="flex flex-col">
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///------------------------------------- add event title -------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="flex justify-center mb-4 font-bold text-[30px] text-purple-600">
              <span>Ctrate New Event</span>
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///------------------------------------- event image field -----------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="flex justify-center items-center">
              <div className="relative">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <div className="w-[500px] h-[300px] rounded-lg bg-purple-300 border-[1px] border-gray-400 flex justify-center items-center text-purple-600 overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : isImageLoading ? (
                    <span className="text-center">Uploading Image...</span>
                  ) : (
                    <span className="text-center flex flex-col items-center">
                      <IoImageSharp className="h-[50px] w-[50px]" />
                      Select or Drag & Drop Image Here
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///------------------------------------- event name field ------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="flex my-4">
              <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <MdEmojiEvents className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Event Name"
                required={true}
                className="w-[460px] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///---------------------------------- event description field --------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="flex mb-4">
              <textarea
                placeholder="Description"
                required={true}
                className="w-[505px] h-[120px] px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///-------------------------------------- add event button -----------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="my-4">
              {!processing ? (
                <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                  <TbCategoryPlus className="mr-2" />
                  Add Event
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
        </form>
      </div>
    </div>
  );
}

export default AddEventForm;
