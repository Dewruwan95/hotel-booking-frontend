import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";

function InquiryPage() {
  const token = localStorage.getItem("token");

  const [inquiries, setInquiries] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Inquiry table columns and fields
  const inquiryColumns = ["Date", "Type", "Status"];
  const inquiryFields = ["timestamp", "inquiryType", "status"];

  // Fetch inquiries
  useEffect(() => {
    fetchInquiries();
  }, [isFormSubmitted]);

  async function fetchInquiries() {
    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/inquiries/all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setInquiries(response.data.inquiries || []);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle inquiry submission
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const inquiryData = {
        name: name,
        email: email,
        type: inquiryType,
        message: message,
      };

      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/inquiries",
        inquiryData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.dismiss();
      toast.success(res.data.message);
      setIsFormSubmitted(true);
      setName("");
      setEmail("");
      setInquiryType("");
      setMessage("");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 mb-10 mt-[120px] bg-purple-100 lg:px-[300px]">
      <h1 className="text-4xl font-bold text-purple-700 text-center pt-4 mb-6">
        Inquiry Page
      </h1>

      {/* Your Inquiries Table */}
      <div className="mb-[50px]">
        <div className="bg-white p-4 shadow rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Inquiries</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : inquiries.length > 0 ? (
            <div className="w-full h-full max-h-[400px] overflow-y-hidden rounded-[10px]">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-600 text-white sticky top-0">
                    {inquiryColumns.map((column, index) => (
                      <th key={index} className="py-3 px-6 text-center">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((data, index) => (
                    <tr
                      key={index}
                      className={`border-b h-auto max-h-[150px]  border-purple-200 ${
                        index % 2 === 0 ? "bg-purple-100" : "bg-white"
                      }`}
                    >
                      {inquiryFields.map((field, fieldIndex) => (
                        <td
                          key={fieldIndex}
                          className="py-4 px-6 text-center max-w-xs h-auto max-h-[150px] whitespace-normal overflow-hidden text-ellipsis"
                        >
                          {field === "timestamp" ? (
                            format(new Date(data[field]), "dd/MM/yyyy")
                          ) : field === "status" ? (
                            <span
                              className={`${
                                data[field] === "reviewed"
                                  ? "text-green-500"
                                  : data[field] === "pending"
                                  ? "text-yellow-500"
                                  : "text-red-500"
                              }`}
                            >
                              {data[field] === "reviewed"
                                ? "Reviewed"
                                : data[field] === "pending"
                                ? "Pending"
                                : "Rejected"}
                            </span>
                          ) : (
                            data[field].charAt(0).toUpperCase() +
                            data[field].slice(1)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No inquiries found.</p>
          )}
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Create a New Inquiry</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Inquiry Type
            </label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Inquiry Type</option>
              <option value="booking">Booking Inquiry</option>
              <option value="services">Services Inquiry</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              required={true}
              rows="5"
              value={message}
              placeholder="Write your message"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          {!isLoading ? (
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow hover:bg-purple-700 transition"
            >
              Submit Inquiry
            </button>
          ) : (
            <button
              disabled
              type="submit"
              className="w-full flex items-center justify-center bg-purple-600 text-white font-bold py-3 rounded-lg shadow"
            >
              <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
              Processing...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default InquiryPage;
