import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa6";
import { IoImageSharp } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import uploadImage from "../../../../utils/MediaUpload";

function AddCategoryForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  // handle image upload change ---------------------------------------------------------
  async function handleImageChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsImageLoading(true);
      const imageUrl = await uploadImage(selectedFile);
      console.log(imageUrl);
      setImage(imageUrl);
      setIsImageLoading(false);
    }
  }

  //-----------------------------------------------------------------
  //!------------------ add category function -----------------------
  //-----------------------------------------------------------------
  const handleAddCategory = (e) => {
    e.preventDefault();
    setProcessing(true);

    console.log("category created successfully");

    setProcessing(false);
  };
  return (
    <div>
      <div className="w-full h-full flex justify-center pt-[70px]">
        <form onSubmit={handleAddCategory}>
          <div className="flex flex-col">
            {/*----------------------------------------------------------------------------------------------*/}
            {/*///----------------------------------- category image field ----------------------------------*/}
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
                    <span className="text-center">Loading...</span>
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
            {/*///----------------------------------- category name field -----------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="flex my-4">
              <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <MdCategory className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Category Name"
                required={true}
                className="w-[460px] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///----------------------------------- category price field ----------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            {/* Price Field */}
            <div className="flex mb-4">
              <div className="bg-purple-300 text-purple-600 h-[45px] w-[45px] flex items-center justify-center rounded-l-[6px]">
                <FaRupeeSign className="h-4 w-4" />
              </div>
              <input
                type="number"
                placeholder="Price"
                required={true}
                className="w-[460px] h-[45px] px-[10px] py-[5px] rounded-r-[6px] border-[1px] border-gray-400 focus:border-[2px] focus:border-purple-400 focus:outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///--------------------------------- category features field ---------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
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
            {/*///------------------------------------ add category button ----------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="my-4">
              {!processing ? (
                <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                  <TbCategoryPlus className="mr-2" />
                  Add Category
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

export default AddCategoryForm;
