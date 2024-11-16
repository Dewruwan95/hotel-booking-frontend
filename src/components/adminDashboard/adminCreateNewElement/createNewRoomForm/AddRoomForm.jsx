import { useEffect, useState } from "react";
import uploadImages from "../../../../utils/MediaUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { IoImageSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaBed, FaCheck, FaHashtag } from "react-icons/fa";

function AddRoomForm() {
  // Check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const [categoriesData, setCategoriesData] = useState([]);
  const [roomNo, setRoomNo] = useState("");
  const [category, setCategory] = useState("");
  const [specialDescription, setSpecialDescription] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState("");
  const [available, setAvailable] = useState("");
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadPromise, setUploadPromise] = useState(null);
  const [pendingSubmission, setPendingSubmission] = useState(false);

  const navigate = useNavigate();

  // fetch categories data on loading
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  // UseEffect to handle pending form submission after photo upload
  useEffect(() => {
    if (!uploadPromise && pendingSubmission) {
      handleAddRoom();
      setPendingSubmission(false);
    }
  }, [uploadPromise, pendingSubmission]);

  // fetch categories data function
  async function fetchCategoriesData() {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/categories"
      );

      setCategoriesData(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // Handle photo upload
  async function handlePhotoChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsPhotoLoading(true);
      const promise = uploadImages(selectedFile);
      setUploadPromise(promise);

      try {
        const photoUrl = await promise;
        setPhotos(photoUrl);
      } catch (error) {
        console.error("Photo upload failed:", error);
      } finally {
        setIsPhotoLoading(false);
        setUploadPromise(null);
      }
    }
  }

  // Add room function
  async function handleAddRoom() {
    setProcessing(true);
    toast.loading("Creating Room...");

    // Check if room number already exists
    const roomExistsRes = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomNo
    );

    if (roomExistsRes.data.exists) {
      toast.dismiss();
      toast.error("Room number already exists. Please use a different number.");
      setProcessing(false);
      return;
    }

    if (uploadPromise) {
      setPendingSubmission(true);
      return;
    }

    try {
      // New room object
      const newRoom = {
        roomNo: roomNo,
        category: category,
        specialDescription: specialDescription,
        maxGuests: maxGuests,
        notes: notes,
        photos: [
          photos ||
            "https://firebasestorage.googleapis.com/v0/b/mern-hotel-management.appspot.com/o/image.png?alt=media&token=0f157e0a-29be-4da3-90a6-6c9eb54720e4",
        ],
        available: available,
      };

      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/rooms",
        newRoom,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      toast.dismiss();
      toast.success("Room created successfully");
      navigate("/admin/rooms");
    } catch (error) {
      console.error("Failed to create room:", error);
      toast.dismiss();
      toast.error("Failed to create room. Please try again.");
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
              handleAddRoom();
            }}
          >
            <div className="flex flex-col">
              <div className="flex justify-center mb-4 font-bold text-[30px] text-purple-600">
                <span>Create New Room</span>
              </div>

              {/* Photo Upload */}
              <div className="flex justify-center items-center mb-4">
                <div className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handlePhotoChange}
                  />
                  <div className="w-[500px] h-[300px] rounded-lg bg-purple-300 border-[1px] border-gray-400 flex justify-center items-center text-purple-600 overflow-hidden">
                    {photos ? (
                      <img
                        src={photos}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : isPhotoLoading ? (
                      <span className="text-center">Uploading Photo...</span>
                    ) : (
                      <span className="text-center flex flex-col items-center">
                        <IoImageSharp className="h-[50px] w-[50px]" />
                        Select or Drag & Drop Photo Here
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center max-w-[505px] my-4">
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

              {/* category & Room Availability */}
              <div className="flex justify-between items-center max-w-[505px] mb-4">
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
                      required
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
                      required
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

              {/* Special Description */}
              <div className="flex mb-4">
                <textarea
                  placeholder="Special Description"
                  className="w-[505px] h-[120px] px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  value={specialDescription}
                  onChange={(e) => setSpecialDescription(e.target.value)}
                />
              </div>

              {/* Notes */}
              <div className="flex mb-4">
                <textarea
                  placeholder="Notes"
                  className="w-[505px] h-[120px] px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="my-4">
                {!processing ? (
                  <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                    <TbCategoryPlus className="mr-2" />
                    Add Room
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

export default AddRoomForm;
