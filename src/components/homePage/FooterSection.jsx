function FooterSection() {
  return (
    <>
      <div className="bg-purple-900 py-8 text-white">
        <div className="container mx-auto text-center">
          <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
          <div className="flex justify-center space-x-6">
            {/* Social Media Icons */}
            <a href="#" className="text-white hover:text-purple-300">
              Facebook
            </a>
            <a href="#" className="text-white hover:text-purple-300">
              Instagram
            </a>
            <a href="#" className="text-white hover:text-purple-300">
              Twitter
            </a>
          </div>
          <p className="mt-4">
            &copy; 2024 Hotel Booking System. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default FooterSection;
