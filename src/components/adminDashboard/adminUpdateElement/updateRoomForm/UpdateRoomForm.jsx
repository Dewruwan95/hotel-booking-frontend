import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uploadImages from "../../../../utils/MediaUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaBed, FaCheck, FaHashtag } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoImageSharp } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { resizeImage } from "../../../../utils/MediaResize";

function UpdateRoomForm() {
  // check if state is available
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/admin/rooms";
  }

  // check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const room = location.state.data;

  const [categoriesData, setCategoriesData] = useState([]);
  const [roomNo, setRoomNo] = useState(room.roomNo);
  const [category, setCategory] = useState(room.category);
  const [specialDescription, setSpecialDescription] = useState(
    room.specialDescription
  );
  const [maxGuests, setMaxGuests] = useState(room.maxGuests);
  const [notes, setNotes] = useState(room.notes);
  const [photos, setPhotos] = useState(room.photos);
  const [available, setAvailable] = useState(room.available);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadPromise, setUploadPromise] = useState(null);
  const [pendingSubmission, setPendingSubmission] = useState(false);

  // fetch categories data on loading
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  // useEffect to check when uploadPromise is completed and form submit if pending
  useEffect(() => {
    if (!uploadPromise && pendingSubmission) {
      handleUpdateRoom();
      setPendingSubmission(false);
    }
  }, [uploadPromise, pendingSubmission]);

  const navigate = useNavigate();

  // fetch categories data function
  async function fetchCategoriesData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/categories/all"
      );

      setCategoriesData(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // handle image upload change ---------------------------------------------------------
  async function handlePhotoChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsPhotoLoading(true);

      try {
        // Resize and crop the image to 600x400
        const croppedImageBlob = await resizeImage(selectedFile, 600, 400);

        // Upload the cropped image to Firebase
        const promise = uploadImages(croppedImageBlob);
        setUploadPromise(promise);

        const imageUrl = await promise;
        setPhotos(imageUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPhotoLoading(false);
        setUploadPromise(null);
      }
    }
  }

  // Update room function
  async function handleUpdateRoom() {
    setProcessing(true);
    toast.loading("Updating Room...");

    // Check if room number already exists
    if (roomNo !== room.roomNo) {
      const roomExistsRes = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomNo
      );

      if (roomExistsRes.data.exists) {
        toast.dismiss();
        toast.error(
          "Room number already exists. Please use a different number."
        );
        setProcessing(false);
        return;
      }
    }

    if (uploadPromise) {
      setPendingSubmission(true);
      return;
    }

    try {
      const updatedRoom = {
        roomNo: roomNo,
        category: category,
        specialDescription: specialDescription,
        maxGuests: maxGuests,
        notes: notes,
        photos: photos || [
          "https://firebasestorage.googleapis.com/v0/b/mern-hotel-management.appspot.com/o/image.png?alt=media&token=0f157e0a-29be-4da3-90a6-6c9eb54720e4",
        ],
        available: available,
      };

      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + room.roomNo,
        updatedRoom,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      toast.dismiss();
      toast.success("Room updated successfully");
      navigate("/admin/rooms");
    } catch (error) {
      console.error("Failed to update room:", error);
      toast.dismiss();
      toast.error("Failed to update room. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <>
      <div>
        <div className="w-full h-full flex justify-center pt-[20px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateRoom();
            }}
          >
            <div className="flex flex-col">
              <div className="flex justify-center mb-2 font-bold text-[30px] text-purple-600">
                <span>Update Room</span>
              </div>

              <div className="pl-1 text-[16px] text-purple-600">
                <span>Image:</span>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer z-[10]"
                    onChange={handlePhotoChange}
                  />
                  <div className="w-[500px] h-[300px] rounded-lg bg-purple-300 border-[1px] border-gray-400 flex justify-center items-center text-purple-600 overflow-hidden">
                    {isPhotoLoading ? (
                      <span className="text-center text-purple-700">
                        Uploading Image...
                      </span>
                    ) : photos ? (
                      <div className="w-full h-full rounded-lg">
                        <img
                          src={photos}
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

              <div className="flex justify-start items-center mt-4">
                <div className="w-1/2 pl-1  text-[16px] text-purple-600">
                  <span>Room No:</span>
                </div>
                <div className="w-1/2 pl-2  text-[16px] text-purple-600">
                  <span>Max Guests:</span>
                </div>
              </div>
              <div className="flex justify-between items-center max-w-[505px] mb-2">
                {/* Room Number */}
                <div className="flex ">
                  <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                    <FaBed className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    placeholder="Room Number"
                    required
                    className="w-[200px] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                  />
                </div>
                {/* Max Guests */}
                <div className="flex ">
                  <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                    <FaHashtag className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    placeholder="Max Guests"
                    required
                    className="w-[200px] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-start items-center ">
                <div className="w-1/2 pl-1  text-[16px] text-purple-600">
                  <span>Category:</span>
                </div>
                <div className="w-1/2 pl-2  text-[16px] text-purple-600">
                  <span>Room Availability:</span>
                </div>
              </div>
              {/* category & Room Availability */}
              <div className="flex justify-between items-center max-w-[505px] mb-2">
                {/* category selection */}
                <div className="flex ">
                  <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                    <MdCategory className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-center ">
                    <select
                      name="category"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-[200px] h-[45px] p-2 border border-purple-300 rounded-r-[6px] focus:outline-none focus:ring-1 focus:ring-purple-500 text-left ${
                        category === "" ? "text-gray-400" : "text-black"
                      }`}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categoriesData.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* room availability selection */}
                <div className="flex ">
                  <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                    <FaCheck className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-center ">
                    <select
                      name="category"
                      id="category"
                      value={available}
                      onChange={(e) => setAvailable(e.target.value)}
                      className={`w-[200px] h-[45px] p-2 border border-purple-300 rounded-r-[6px] focus:outline-none focus:ring-1 focus:ring-purple-500 text-left ${
                        available === "" ? "text-gray-400" : "text-black"
                      }`}
                    >
                      <option value="" disabled>
                        Set Room Availability
                      </option>
                      <option value={true}>Available</option>
                      <option value={false}>Not Available</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pl-1 text-[16px] text-purple-600">
                <span>Special Description:</span>
              </div>
              {/* Special Description */}
              <div className="flex mb-2">
                <textarea
                  placeholder="Special Description"
                  className="w-[505px] h-[120px] px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  value={specialDescription}
                  onChange={(e) => setSpecialDescription(e.target.value)}
                />
              </div>

              <div className="pl-1 text-[16px] text-purple-600">
                <span>Notes:</span>
              </div>
              {/* Notes */}
              <div className="flex mb-2">
                <textarea
                  placeholder="Notes"
                  className="w-[505px] h-[120px] px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="my-2">
                {!processing ? (
                  <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                    <GrUpdate className="mr-2" />
                    Update Room
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
    </>
  );
}

export default UpdateRoomForm;
