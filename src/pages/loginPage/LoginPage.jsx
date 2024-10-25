function LoginPage() {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-purple-500 w-full h-[100vh] flex items-center justify-center">
      <div className="w-[450px] h-[450px] bg-purple-200 opacity-70 rounded-lg flex flex-col items-center justify-center relative">
        <h1 className="text-[30px] text-purple-950 font-bold absolute top-[50px]">
          Login
        </h1>
        <input
          type="text"
          placeholder="Enter your email address"
          className="text-purple-950 p-[10px] rounded-lg w-[90%] my-[15px]"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="text-purple-950 p-[10px] rounded-lg w-[90%] my-[15px]"
        />
        <button className="absolute bottom-10 w-[90%] my-[10px] px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-800 hover:shadow-lg transition duration-300 ease-in-out">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
