import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function UpdateTicketForm() {
  // Check if state is available
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/admin/ticketing";
  }

  // Check if user is admin
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (userType !== "admin" || !token) {
    window.location.href = "/";
  }

  const ticket = location.state.data;

  const [timestamp, setTimestamp] = useState(ticket.timestamp);
  const [ticketId, setTicketId] = useState(ticket._id);
  const [inquiryType, setInquiryType] = useState(
    ticket.inquiryType.charAt(0).toUpperCase() + ticket.inquiryType.slice(1)
  );
  const [email, setEmail] = useState(ticket.email);
  const [name, setName] = useState(ticket.name);
  const [message, setMessage] = useState(ticket.message);
  const [reply, setReply] = useState(ticket.reply);
  const [status, setStatus] = useState(ticket.status);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  //-----------------------------------------------------------------
  //!---------------- Update ticket function ------------------------
  //-----------------------------------------------------------------
  async function handleUpdateTicket() {
    setProcessing(true);
    toast.loading("Updating Ticket...");

    // Create new ticket object
    const updatedTicket = { reply: reply, status: status };

    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/inquiries/" + ticketId,
        updatedTicket,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        toast.dismiss();
        toast.success("Ticket updated successfully");
        navigate("/admin/ticketing");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to update ticket, Please try again.");
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
            handleUpdateTicket();
          }}
        >
          <div className="flex flex-col items-center">
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-purple-200">
                <tbody className="bg-white divide-y divide-purple-200">
                  <tr className="hover:bg-purple-50">
                    <td className="w-[150px] bg-purple-600 text-white py-3 px-6 text-center">
                      Inquired On
                    </td>
                    <td className="w-[400px] px-6 py-4 text-sm text-gray-900">
                      {format(new Date(timestamp), "yyyy MMMM dd - h:mma")}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Ticket Type
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {inquiryType}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Name
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{name}</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Email
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{email}</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Message
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {message}
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Reply
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <textarea
                        value={reply}
                        onChange={(e) => {
                          setReply(e.target.value);
                        }}
                        className="w-full px-3 py-2 border rounded-md"
                        rows="4"
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="bg-purple-600 text-white py-3 px-6 text-center">
                      Status
                    </td>
                    <td className="px-6 py-4 text-md text-gray-900">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`px-4 py-2 font-bold border rounded-md ${
                          status === "resolved"
                            ? "text-green-500"
                            : status === "pending"
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-4">
              {!processing ? (
                <button className="w-[505px] h-[40px] text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center bg-purple-600 hover:bg-purple-800">
                  <GrUpdate className="mr-2" />
                  Update Ticket
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

export default UpdateTicketForm;
