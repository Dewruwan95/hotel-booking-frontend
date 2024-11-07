import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateFeedbackForm() {
  // check if state is available
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/admin/feedbacks";
  }

  // check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const feedback = location.state.data;

  const date = feedback.timestamp;
  const name = feedback.name;
  const email = feedback.email;
  const title = feedback.title;
  const description = feedback.description;
  const rating = feedback.rating;
  const [isApproved, setIsApproved] = useState(feedback.approved);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  function handleStatusChange(e) {
    setIsApproved(e.target.value === "true");
  }

  async function handleUpdateFeedback() {
    setProcessing(true);
    toast.loading("Updating Feedback...");

    // create new feedback object
    const updatedFeedback = {
      approved: isApproved,
    };

    console.log(updatedFeedback);

    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/feedbacks/" + feedback._id,
        updatedFeedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      toast.dismiss();
      toast.success("Feedback updated successfully");
      navigate("/admin/feedbacks");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update feedback. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[600px] h-full flex flex-col justify-center pt-[20px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateFeedback();
          }}
        >
          <div className="flex flex-col items-center">
            <div className="overflow-x-auto rounded-lg shadow">
              {/*----------------------------------------------------------------------------------------------*/}
              {/*///----------------------------------- feedback data table -----------------------------------*/}
              {/*----------------------------------------------------------------------------------------------*/}
              <table className="min-w-full divide-y divide-purple-200">
                <tbody className="bg-white divide-y divide-purple-200">
                  {/* feedback date */}
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Date
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                      {date}
                    </td>
                  </tr>
                  {/* feedback name */}
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Name
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {name}
                    </td>
                  </tr>
                  {/* feedback email */}
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Email
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {email}
                    </td>
                  </tr>
                  {/* feedback rating */}
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Rating
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-3xl text-gray-900 flex">
                      {Array.from({ length: rating }, (_, index) => (
                        <AiFillStar key={index} className="text-yellow-500" />
                      ))}
                    </td>
                  </tr>
                  {/* feedback title */}
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Title
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">
                      {title}
                    </td>
                  </tr>
                  {/* feedback description */}
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Description
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-h-[180px] overflow-y-auto">
                        {description}
                      </div>
                    </td>
                  </tr>
                  {/* feedback status */}
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Status
                    </td>
                    <td className="px-6 py-4 text-md text-gray-900">
                      <select
                        value={isApproved}
                        onChange={handleStatusChange}
                        className={`px-4 py-2 font-bold rounded-md ${
                          isApproved ? "text-green-500" : "text-orange-500"
                        }`}
                      >
                        <option value={true} className="text-green-500">
                          Approved
                        </option>
                        <option value={false} className="text-orange-500">
                          Pending
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*----------------------------------------------------------------------------------------------*/}
            {/*///----------------------------------- update feedback button --------------------------------*/}
            {/*----------------------------------------------------------------------------------------------*/}
            <div className="my-4">
              {!processing ? (
                <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                  <GrUpdate className="mr-2" />
                  Update Feedback
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

export default UpdateFeedbackForm;
