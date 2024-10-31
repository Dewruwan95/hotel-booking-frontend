import Header from "../../../components/clientHeader/Header";

function HomePage() {
  return (
    <>
      {/* client header */}
      <Header />

      {/* main background */}
      <div className="w-[100%] h-[100vh] bg-purple-200 flex justify-center">
        {/* hero section */}
        <div className="w-[100%] h-[750px] bg-purple-800 overflow-hidden">
          {/* hero image */}
          <div
            className="h-full w-full bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(hero.jpg)` }}
          >
            {/* background overlay */}
            <div className="h-full w-full bg-black bg-opacity-30">
              {/* hero text content */}
              <div className="h-full w-full flex flex-col items-center mt-[100px]">
                {/* heading text */}
                <div className="p-[20px] flex flex-col items-center">
                  {/* primary heading */}
                  <h1 className="text-[60px] text-purple-200">
                    Book Your Room Today
                  </h1>
                  {/* secondary heading */}
                  <h2 className="text-[30px] text-purple-200">
                    Find and book your perfect stay
                  </h2>
                </div>

                {/* booking placeholder */}
                <div className="w-[80%] h-[120px] p-[12px] flex justify-center items-center bg-purple-300 bg-opacity-50 rounded-bl-[50px] rounded-tr-[50px] ">
                  <div className="w-full h-full  bg-purple-50 rounded-bl-[40px] rounded-tr-[40px] flex items-center justify-center overflow-hidden">
                    {/* left side placeholder */}
                    <div className="h-[100%] w-[80%] flex items-center justify-around ">
                      {/* check-in date input */}
                      <div className="flex flex-col items-center">
                        <label className="text-purple-700 text-md mb-1">
                          Check-in
                        </label>
                        <input
                          type="date"
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
                          className="w-[200px] p-2 border border-purple-300 rounded-md text-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 text-center"
                        />
                      </div>
                      {/* category selection */}
                      <div className="flex flex-col items-center">
                        <label className="text-purple-700 text-md mb-1">
                          Category
                        </label>
                        <select
                          name=""
                          id=""
                          className="w-[200px] p-2 border border-purple-300 rounded-md text-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 text-center"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>
                      {/* room selection */}
                      <div className="flex flex-col items-center">
                        <label className="text-purple-700 text-md mb-1">
                          Room
                        </label>
                        <select
                          name=""
                          id=""
                          className="w-[200px] p-2 border border-purple-300 rounded-md text-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 text-center"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>
                    </div>

                    {/* right side placeholder */}
                    <div className="h-[100%] w-[20%]">
                      {/* booking button */}
                      <div className="h-full w-full">
                        <button className="w-full h-full text-[20px] bg-purple-500 text-white font-semibold  hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
