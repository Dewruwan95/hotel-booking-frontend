function AdminDashboardProfile() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-white">
      <img
        src="user.jpg"
        alt="User Image"
        className="w-[100px] h-[100px] rounded-full border-5 border-white"
      />
      <span className="text-[30px] font-bold mt-2">name</span>
      <span className="text-[20px] font-light">{`(Administrator)`}</span>
    </div>
  );
}

export default AdminDashboardProfile;
