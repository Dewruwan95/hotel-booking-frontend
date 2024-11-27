import {
  AlertDialogDescription,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function OtpVerificationForm({
  showOtpVerification,
  setShowOtpVerification,
  setUserStatus,
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // handle otp input cange
  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      // Ensure only digits and max length of 4
      setOtp(value);
    }
  };

  // handle verification
  async function handleVerify() {
    if (!otp) {
      return toast.error("Please enter OTP before verify!");
    }

    setLoading(true);
    const userEmail = localStorage.getItem("registeredEmail");

    const data = {
      email: userEmail,
      otp: parseInt(otp, 10), // Convert OTP to number
    };

    //verify otp
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/validate-otp",
        data
      );

      toast.success(res.data.message);
      setShowOtpVerification(false);
      localStorage.removeItem("registeredEmail");
      setUserStatus("login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AlertDialog
        open={showOtpVerification}
        onOpenChange={setShowOtpVerification}
      >
        <AlertDialogContent className="max-w-[300px] lg:max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-purple-500">
              Verify your email
            </AlertDialogTitle>
          </AlertDialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
          >
            <div className="flex justify-center items-center mt-4">
              <input
                type="number"
                required={true}
                value={otp}
                onChange={handleInputChange}
                placeholder="Enter 4-digit OTP"
                className="border border-gray-300 rounded px-4 py-2 text-center w-50 text-lg"
                maxLength={4}
              />
            </div>

            <div className="pt-10 flex items-center justify-end space-x-4">
              <AlertDialogCancel
                onClick={() => {
                  setUserStatus("login");
                  toast(
                    "You can login now & verify your email from your profile later!",
                    {
                      icon: "👉",
                    }
                  );
                }}
              >
                Skip
              </AlertDialogCancel>

              {!loading ? (
                <button
                  type="submit"
                  className=" bg-purple-700 hover:bg-purple-600 px-4 text-white rounded-md h-[40px]"
                >
                  Verify
                </button>
              ) : (
                <button
                  disabled
                  type="submit"
                  className="flex flex-row items-center justify-center bg-purple-700 hover:bg-purple-600 px-4 text-white rounded-md h-[40px]"
                >
                  <AiOutlineLoading3Quarters className="mr-2 animate-spin font-bold	" />
                  Verifying
                </button>
              )}
            </div>
          </form>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default OtpVerificationForm;
