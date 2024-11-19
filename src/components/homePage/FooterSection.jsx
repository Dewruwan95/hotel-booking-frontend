function FooterSection() {
  return (
    <>
      <div className="bg-purple-900 relative text-white  pb-[40px]">
        {/* SVG Positioned and Centered */}
        <div className="absolute inset-x-0 -top-[80px] flex justify-center h-[100px]">
          <svg
            className="w-full text-purple-900 fill-current"
            viewBox="0 0 400 50"
          >
            <path d="M0,40h153.79c3.98,0,7.79-1.58,10.61-4.39L200,0l35.61,35.61c2.81,2.81,6.63,4.39,10.61,4.39h153.79v60H0v-60Z" />
          </svg>
        </div>

        {/* Footer Content */}
        <div className="container mx-auto text-center pt-[60px]">
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
