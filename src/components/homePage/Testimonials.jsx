function Testimonials() {
  return (
    <>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-800 mb-8">
            What Our Guests Say
          </h2>
          <div className="flex flex-wrap justify-center">
            {/* Testimonial 1 */}
            <div className="w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-purple-600 mb-4">
                  A perfect stay! The service was amazing, and the ocean view
                  was just beautiful. Highly recommend!
                </p>
                <h4 className="font-semibold text-purple-700">John D.</h4>
                <p className="text-sm text-gray-600">Guest</p>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-purple-600 mb-4">
                  The family suite was perfect for our vacation! Spacious and
                  comfortable. We will definitely return.
                </p>
                <h4 className="font-semibold text-purple-700">Sarah M.</h4>
                <p className="text-sm text-gray-600">Guest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonials;
