function ContactPage() {
  return (
    <>
      <div className="mt-[120px]">
        <div className="w-full min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 py-16 px-5">
          <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="relative">
              <div
                style={{
                  backgroundImage: `url('gallery-image-landscape-2.jpg')`,
                }}
                className="w-full h-64 bg-cover bg-center"
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-5xl font-bold text-white">Contact Us</h1>
              </div>
            </div>
            <div className="p-10">
              <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">
                Get in Touch with Hotel ABC
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
                We’re here to assist you! Whether you have questions, need
                assistance, or want to provide feedback, feel free to reach out
                to us.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Information */}
                <div>
                  <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                    Contact Information
                  </h3>
                  <ul className="space-y-4 text-lg text-gray-700">
                    <li>
                      <span className="font-semibold text-purple-600">
                        Address:
                      </span>{" "}
                      123 Luxury Lane, Serenity City, Country
                    </li>
                    <li>
                      <span className="font-semibold text-purple-600">
                        Phone:
                      </span>{" "}
                      +94 123 456 789
                    </li>
                    <li>
                      <span className="font-semibold text-purple-600">
                        Email:
                      </span>{" "}
                      info@hotelabc.com
                    </li>
                    <li>
                      <span className="font-semibold text-purple-600">
                        Working Hours:
                      </span>{" "}
                      24/7 Customer Support
                    </li>
                  </ul>
                </div>
                {/* Contact Form */}
                <div>
                  <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                    Send Us a Message
                  </h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        rows="4"
                        placeholder="Write your message"
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow hover:bg-purple-700 transition"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              {/* Map Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-semibold text-purple-700 text-center mb-6">
                  Find Us Here
                </h2>
                <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden shadow">
                  <iframe
                    title="Hotel ABC Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509389!2d144.95373531531863!3d-37.816279979751566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774c2e3bb75a29!2sMelbourne%20CBD%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1619413048841!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                    className="border-none"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
