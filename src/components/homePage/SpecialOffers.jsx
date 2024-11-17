function SpecialOffers() {
  return (
    <>
      <div className="bg-purple-800 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
          <div className="flex flex-col md:flex-row flex-wrap justify-center">
            {/* Special Offer 1 */}
            <div className="w-full lg:w-1/3 p-4 ">
              <div className="h-[250px] bg-purple-600 p-6 rounded-lg shadow-lg flex flex-col items-center  relative">
                <h3 className="text-2xl font-semibold mb-4">Weekend Getaway</h3>
                <div className="h-[100px] flex flex-col items-center justify-center">
                  <p className="mb-4">
                    Book a weekend stay and get 30% off on room rates. Hurry,
                    limited time offer!
                  </p>
                </div>
                <button className="absolute bottom-6 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md">
                  Book Now
                </button>
              </div>
            </div>
            {/* Special Offer 2 */}
            <div className="w-full lg:w-1/3 p-4 ">
              <div className="h-[250px] bg-purple-600 p-6 rounded-lg shadow-lg flex flex-col items-center  relative">
                <h3 className="text-2xl font-semibold mb-4">
                  Stay More, Save More
                </h3>
                <div className="h-[100px] flex flex-col items-center justify-center">
                  <p className="mb-4">
                    Get up to 50% off when you book a stay for more than 3
                    nights!
                  </p>
                </div>
                <button className="absolute bottom-6 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecialOffers;
