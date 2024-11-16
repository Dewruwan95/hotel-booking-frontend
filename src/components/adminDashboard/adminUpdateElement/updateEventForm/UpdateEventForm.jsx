import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uploadImages from "../../../../utils/MediaUpload";
import { IoImageSharp } from "react-icons/io5";
import { MdEmojiEvents } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

function UpdateEventForm() {
  // check if state is available
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/admin/gallery";
  }

  // check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const event = location.state.data;

  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadPromise, setUploadPromise] = useState(null);
  const [pendingSubmission, setPendingSubmission] = useState(false);

  // useEffect to check when uploadPromise is completed and form submit if pending
  useEffect(() => {
    if (!uploadPromise && pendingSubmission) {
      handleUpdateEvent();
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
  //!------------------ update event function -----------------------
  //-----------------------------------------------------------------
  async function handleUpdateEvent() {
    setProcessing(true);
    toast.loading("Updating Event...");

    // Check if the image is still uploading
    if (uploadPromise) {
      // Set pending submission to submit after image upload
      setPendingSubmission(true);
      return;
    }

    // create new event object
    const updatedEvent = {
      name: name,
      description: description,
      image: image,
    };

    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/events/" + event._id,
        updatedEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      toast.dismiss();
      toast.success("Event updated successfully");
      navigate("/admin/gallery");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update event. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div>
      <div className="w-full h-full flex justify-center pt-[30px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateEvent();
          }}
        >
          <div className="flex flex-col">
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///------------------------------------ event image field ------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="pl-1 mb-2 text-[16px] text-purple-600">
              <span>Image:</span>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer z-[10]"
                  onChange={handleImageChange}
                />
                <div className="w-[500px] h-[300px] rounded-lg bg-purple-300 border-[1px] border-gray-400 flex justify-center items-center text-purple-600 overflow-hidden">
                  {isImageLoading ? (
                    <span className="text-center text-purple-700">
                      Uploading Image...
                    </span>
                  ) : image ? (
                    <div className="w-full h-full rounded-lg">
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <span className="text-center flex rounded-lg flex-col items-center justify-center absolute inset-0 z-[9] bg-black bg-opacity-50 text-white">
                        <IoImageSharp className="h-[50px] w-[50px]" />
                        Select or Drag & Drop New Image Here
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///------------------------------------ event name field -------------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="pl-1 my-2 text-[16px] text-purple-600">
              <span>Name:</span>
            </div>
            <div className="flex mb-4">
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
            {/*///--------------------------------- event description field ---------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="pl-1 mb-2 text-[16px] text-purple-600">
              <span>Description:</span>
            </div>
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
            {/*///------------------------------------ update event button ----------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="my-4">
              {!processing ? (
                <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                  <GrUpdate className="mr-2" />
                  Update Event
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

export default UpdateEventForm;
