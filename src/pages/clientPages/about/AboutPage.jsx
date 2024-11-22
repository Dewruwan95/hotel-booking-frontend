function AboutPage() {
  return (
    <>
      <div className="mt-[120px]">
        <div className="w-full min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 py-16 px-5">
          <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="relative">
              <div
                style={{
                  backgroundImage: `url('gallery-image-landscape-1.jpg')`,
                }}
                className="w-full h-64 bg-cover bg-center"
              ></div>

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-5xl font-bold text-white">
                  About Hotel ABC
                </h1>
              </div>
            </div>
            <div className="p-10">
              <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">
                Experience the Perfect Blend of Luxury and Serenity
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Welcome to{" "}
                <span className="font-semibold text-purple-600">Hotel ABC</span>
                , where luxury meets tranquility. Our hotel is situated in a
                prime location, offering breathtaking views, world-class
                amenities, and a haven of relaxation. Whether you're seeking a
                serene getaway, a memorable family vacation, or a convenient
                business trip, Hotel ABC is the ideal choice.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At{" "}
                <span className="font-semibold text-purple-600">Hotel ABC</span>
                , we believe in creating unique experiences tailored to your
                needs. With a blend of modern elegance and warm hospitality, we
                strive to make your stay unforgettable.
              </p>
              <h2 className="text-2xl font-semibold text-purple-700 mb-6">
                Why Choose Us?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">
                    Luxurious Accommodations
                  </h3>
                  <p className="text-gray-700">
                    Our rooms and suites are designed with comfort and elegance
                    in mind, offering stunning views, plush bedding, and premium
                    amenities.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">
                    Exquisite Dining
                  </h3>
                  <p className="text-gray-700">
                    Indulge in a variety of culinary delights, from gourmet
                    local cuisine to international favorites, prepared by our
                    expert chefs.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">
                    Recreational Activities
                  </h3>
                  <p className="text-gray-700">
                    Enjoy our spa, swimming pool, fitness center, and nearby
                    attractions to make the most of your stay.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">
                    Exceptional Service
                  </h3>
                  <p className="text-gray-700">
                    Our dedicated team ensures that every detail is taken care
                    of, from personalized concierge services to 24/7 assistance.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-purple-700 mb-4">
                  Our Commitment to Sustainability
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Hotel ABC, we are committed to preserving the environment.
                  We embrace sustainable practices, such as energy-efficient
                  technologies, eco-friendly amenities, and community
                  engagement, to minimize our ecological footprint.
                </p>
              </div>
              <div className="mt-10 text-center">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-purple-700 transition">
                  Book Your Stay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
