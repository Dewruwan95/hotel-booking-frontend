import { useState } from "react";
function RegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        <button className="absolute top-3 right-3 text-gray-500">
          &times;
        </button>
        <div className="flex">
          {/* Image Section */}
          <div className="w-1/2">
            <img
              src="https://example.com/image" // Replace with your image URL
              alt="Fashion"
              className="object-cover h-full"
            />
          </div>
          {/* Form Section */}
          <div className="w-1/2 p-6">
            <div className="flex mb-4">
              <button
                className={`w-1/2 py-2 text-center ${
                  isLogin ? "border-b-2 border-black font-bold" : ""
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`w-1/2 py-2 text-center ${
                  !isLogin ? "border-b-2 border-black font-bold" : ""
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Username / Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                  SIGN IN
                </button>
              </div>
            ) : (
              <div>
                {/* Sign Up Form goes here */}
                {/* Add fields for Sign Up */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
