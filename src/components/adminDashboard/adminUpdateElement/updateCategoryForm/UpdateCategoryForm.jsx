import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa6";
import { IoImageSharp } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import uploadImages from "../../../../utils/MediaUpload";

function UpdateCategoryForm() {
  // check if state is available
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/admin/categories";
  }

  // check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const category = location.state.data;

  const [name, setName] = useState(category.name);
  const [price, setPrice] = useState(category.price);
  const [features, setFeatures] = useState(category.features.join(", "));
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(category.image);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadPromise, setUploadPromise] = useState(null);
  const [pendingSubmission, setPendingSubmission] = useState(false);

  // useEffect to check when uploadPromise is completed and form submit if pending
  useEffect(() => {
    if (!uploadPromise && pendingSubmission) {
      handleUpdateCategory();
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
  //!---------------- update category function ----------------------
  //-----------------------------------------------------------------
  async function handleUpdateCategory() {
    setProcessing(true);
    toast.loading("Updating Category...");

    // Check if the image is still uploading
    if (uploadPromise) {
      // Set pending submission to submit after image upload
      setPendingSubmission(true);
      return;
    }

    // create new category object
    const updatedCategory = {
      price: price,
      features: features.split(","),
      description: description,
      image: image,
    };

    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/categories/" + category.name,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      toast.dismiss();
      toast.success("Category updated successfully");
      navigate("/admin/categories");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update category. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[500px] h-full flex flex-col justify-center pt-[20px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateCategory();
          }}
        >
          <div className="flex flex-col">
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///----------------------------------- category image field ----------------------------------*/}
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

            <div className="flex justify-between gap-4">
              {/*----------------------------------------------------------------------------------------------*/}
              {/*///----------------------------------- category name field -----------------------------------*/}
              {/*----------------------------------------------------------------------------------------------*/}
              <div className="w-1/2">
                <div className="pl-1 my-2 text-[16px] text-purple-600">
                  <span>Name:</span>
                </div>
                <div className="flex mb-4">
                  <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                    <MdCategory className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Category Name"
                    required={true}
                    className=" h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/*----------------------------------------------------------------------------------------------*/}
              {/*///----------------------------------- category price field ----------------------------------*/}
              {/*----------------------------------------------------------------------------------------------*/}
              <div className="w-1/2 ">
                <div className="pl-1 my-2 text-[16px] text-purple-600">
                  <span>Price:</span>
                </div>
                <div className="flex mb-4">
                  <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                    <FaRupeeSign className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    placeholder="Price"
                    required={true}
                    className=" h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------- category features field ---------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="pl-1 mb-2 text-[16px] text-purple-600">
              <span>Features:</span>
            </div>
            <div className="flex mb-4">
              <textarea
                placeholder="Features (comma-separated)"
                className="w-[505px] h-[120px] px-[10px] py-[5px] rounded-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
              />
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///-------------------------------- category description field -------------------------------*/}
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
            {/*///----------------------------------- update category button --------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="my-4">
              {!processing ? (
                <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                  <GrUpdate className="mr-2" />
                  Update Category
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

export default UpdateCategoryForm;
