import { useEffect, useState } from "react";
import Header from "../../../components/clientHeader/Header";
import axios from "axios";

function HomePage() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [bookingData, setBookingData] = useState("");

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  // fetch categories data function
  async function fetchCategoriesData() {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/categories"
      );

      setCategoriesData(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // handle start date change
  function handleStartDateChange(e) {
    setStartDate(e.target.value);
  }

  //handle end date change
  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }

  // handle category change
  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  async function handleBooking() {
    const newBookingData = {
      start: startDate,
      end: endDate,
      category: category,
    };
    //const token = localStorage.getItem("token");
    console.log(newBookingData);
  }

  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      {/* client header */}
      <Header />

      {/* main background */}
      <div className="w-[100%] h-[100vh] bg-purple-200 flex justify-center">
        {/* hero section */}
        <div className="w-[100%] h-[600px] bg-purple-800 overflow-hidden">
          {/* hero image */}
          <div
            className="h-full w-full bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(hero.jpg)` }}
          >
            {/* background overlay */}
            <div className="h-full w-full bg-black bg-opacity-30">
              {/* hero text content */}
              <div className="h-full w-full flex flex-col items-center mt-[30px]">
                {/* heading text */}
                <div className="p-[15px] flex flex-col items-center">
                  {/* primary heading */}
                  <h1 className="text-[40px] text-purple-200 text-center">
                    Book Your Room Today
                  </h1>
                  {/* secondary heading */}
                  <h2 className="text-[20px] text-purple-200">
                    Find and book your perfect stay
                  </h2>
                </div>

                {/* booking placeholder */}
                <div className="w-[80%] h-[370px] p-[12px] flex flex-col justify-center items-center bg-purple-300 bg-opacity-50 rounded-bl-[50px] rounded-tr-[50px] ">
                  <div className="w-full h-full  bg-purple-50 rounded-bl-[40px] rounded-tr-[40px] flex flex-col items-center justify-center overflow-hidden">
                    {/* left side placeholder */}
                    <div className="h-[100%] w-[80%] flex flex-col items-center justify-around ">
                      {/* check-in date input */}
                      <div className="flex flex-col items-center mt-8">
                        <label className="text-purple-700 text-md mb-1">
                          Check-in
                        </label>
                        <input
                          type="date"
                          min={today}
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
                          defaultValue=""
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
                      <div className="h-full w-full flex flex-col items-center">
                        <button
                          onClick={handleBooking}
                          className="w-[200px] rounded-lg mt-5 h-[50px] text-[20px] bg-purple-500 text-white font-semibold  hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700"
                        >
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
