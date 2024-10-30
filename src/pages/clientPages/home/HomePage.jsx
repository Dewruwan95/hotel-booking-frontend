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
            style={{ backgroundImage: "hero.jpg" }}
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
                <div className="w-[80%] h-[150px] bg-purple-50 rounded-bl-[50px] rounded-tr-[50px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
