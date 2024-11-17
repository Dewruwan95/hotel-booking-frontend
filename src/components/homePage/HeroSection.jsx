import { AiOutlineLoading3Quarters } from "react-icons/ai";

function HeroSection({
  today,
  startDate,
  endDate,
  category,
  categoriesData,
  processing,
  handleStartDateChange,
  handleEndDateChange,
  handleCategoryChange,
  handleBooking,
}) {
  return (
    <div className="w-[100%] h-[600px] lg:h-[650px] xl:h-[750px] bg-purple-800 overflow-hidden">
      {/* hero image */}
      <div
        className="h-full w-full bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: `url(hero.jpg)` }}
      >
        {/* background overlay */}
        <div className="h-full w-full bg-black bg-opacity-30">
          {/* hero text content */}
          <div className="h-full w-full flex flex-col items-center mt-[30px] lg:mt-[50px] xl:mt-[100px]">
            {/* heading text */}
            <div className="p-[15px] lg:p-[18px] xl:p-[20px] flex flex-col items-center">
              {/* primary heading */}
              <h1 className="text-[40px] lg:text-[50px] xl:text-[60px] text-purple-200 text-center">
                Book Your Room Today
              </h1>
              {/* secondary heading */}
              <h2 className="text-[20px] g:text-[25px] xl:text-[30px] text-purple-200">
                Find and book your perfect stay
              </h2>
            </div>

            {/* booking placeholder */}
            <div className="w-[80%] md:w-[40%] lg:w-[80%] 2xl:w-[60%] h-[370px] lg:h-[200px] xl:h-[150px] p-[12px] flex flex-col justify-center items-center bg-purple-300 bg-opacity-50 rounded-bl-[50px] rounded-tr-[50px] ">
              <div className="w-full h-full bg-purple-50 rounded-bl-[40px] rounded-tr-[40px] flex flex-col lg:flex-row items-center justify-center overflow-hidden">
                {/* left side placeholder */}
                <div className="h-[100%] w-[80%] flex flex-col lg:flex-row items-center justify-around ">
                  {/* check-in date input */}
                  <div className="flex flex-col items-center mt-8 lg:mt-0">
                    <label className="text-purple-700 text-md mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      min={today}
                      defaultValue={startDate}
                      onChange={handleStartDateChange}
                      className="w-[200px] p-2 border border-purple-300 rounded-md text-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 text-center "
                    />
                  </div>

                  {/* check-out date input */}
                  <div className="flex flex-col items-center">
                    <label className="text-purple-700 text-md mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      min={today}
                      defaultValue={endDate}
                      onChange={handleEndDateChange}
                      className="w-[200px] p-2 border border-purple-300 rounded-md text-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 text-center"
                    />
                  </div>
                  {/* category selection */}
                  <div className="flex flex-col items-center">
                    <label className="text-purple-700 text-md mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      value={category}
                      onChange={handleCategoryChange}
                      className="w-[200px] p-2 border border-purple-300 rounded-md text-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 text-center"
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

                {/* right side placeholder */}
                <div className="h-[100%] w-[20%]">
                  {/* booking button */}
                  <div className="h-full w-full flex flex-col items-center lg:block ">
                    {!processing ? (
                      <button
                        onClick={handleBooking}
                        className="w-[200px] lg:w-full h-[50px] lg:h-full rounded-lg lg:rounded-none mt-5 lg:mt-0  text-[20px] bg-purple-500 text-white font-semibold  hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700"
                      >
                        Book Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-[200px] lg:w-full h-[50px] lg:h-full rounded-lg lg:rounded-none mt-5 lg:mt-0 text-[20px] bg-purple-500 text-white font-semibold  focus:outline-none focus:ring-2 focus:ring-purple-700 flex items-center justify-center"
                      >
                        <AiOutlineLoading3Quarters className="mr-2 animate-spin font-bold	" />
                        Processing...
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
