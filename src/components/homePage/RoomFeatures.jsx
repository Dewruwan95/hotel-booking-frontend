function RoomFeatures() {
  return (
    <>
      <div className="w-full max-h-[100vh] bg-purple-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-800 mb-8">
            Our Room Features
          </h2>
          <div className="flex flex-wrap justify-center">
            {/* Room Feature Card 1 */}
            <div className="w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-700 mb-4">
                  Luxury Rooms
                </h3>
                <p className="text-purple-600">
                  Experience comfort and luxury in our spacious rooms, featuring
                  king-sized beds and modern amenities.
                </p>
              </div>
            </div>
            {/* Room Feature Card 2 */}
            <div className="w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-700 mb-4">
                  Ocean View
                </h3>
                <p className="text-purple-600">
                  Enjoy a breathtaking view of the ocean from your room, with
                  floor-to-ceiling windows and premium seating.
                </p>
              </div>
            </div>
            {/* Room Feature Card 3 */}
            <div className="w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-700 mb-4">
                  Family Suites
                </h3>
                <p className="text-purple-600">
                  Spacious and perfect for families, our suites include a living
                  area, kitchen, and private balconies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomFeatures;
