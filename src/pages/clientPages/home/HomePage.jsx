import { useEffect, useState } from "react";
import Header from "../../../components/clientHeader/Header";
import axios from "axios";
import toast from "react-hot-toast";
import RoomCategories from "../../../components/homePage/RoomCategories";
import SpecialOffers from "../../../components/homePage/SpecialOffers";
import Testimonials from "../../../components/homePage/Testimonials";
import FooterSection from "../../../components/homePage/FooterSection";
import HeroSection from "../../../components/homePage/HeroSection";
import ImageGallery from "../../../components/homePage/ImageGallery";
import { Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "../about/AboutPage";
import ContactPage from "../contact/ContactPage";
import GalleryPage from "../gallery/GalleryPage";
import ProfilePage from "../profile/ProfilePage";
import CustomerBookingPage from "../booking/CustomerBookingPage";
import InquiryPage from "../inquiry/InquiryPage";
import FeedbackPage from "../feedback/FeedbackPage";
import CustomerFeedbackPage from "../feedback/CustomerFeedbackPage";

function HomePage({
  openLoginPopup,
  handleUserLogedOut,
  isUserLoggedIn,
  handleUserLogedIn,
}) {
  const pendingBooking = JSON.parse(localStorage.getItem("pendingBookingData"));
  const token = localStorage.getItem("token");

  const [categoriesData, setCategoriesData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  useEffect(() => {
    if (categoriesData.length === 0) {
      fetchCategoriesData();
      fetchFeedbacksData();
    }

    if (pendingBooking && !startDate && !endDate && !category) {
      setStartDate(pendingBooking.start);
      setEndDate(pendingBooking.end);
      setCategory(pendingBooking.category);
      setIsInitialLoad(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad && startDate && endDate && category) {
      handleBooking();
      setIsInitialLoad(false);
    }
  }, [startDate, endDate, category, isInitialLoad]);

  useEffect(() => {
    if (!pendingBooking && !isUserLoggedIn) {
      clearFields();
    }
  }, [isUserLoggedIn]);

  // fetch categories data function
  async function fetchCategoriesData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/categories/all"
      );

      setCategoriesData(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // fetch feedback data function
  async function fetchFeedbacksData() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/feedbacks/all"
      );

      setFeedbackData(res.data.feedbacks);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  // handle booking
  async function handleBooking() {
    if (!startDate || !endDate || !category) {
      toast.error("Please fill the fields before place a booking!");
    } else {
      const newBookingData = {
        start: startDate,
        end: endDate,
        category: category,
      };
      if (!token) {
        localStorage.setItem(
          "pendingBookingData",
          JSON.stringify(newBookingData)
        );
        openLoginPopup();
        toast.error("Please login to place a booking!");
      } else {
        setProcessing(true);
        try {
          const res = await axios.post(
            import.meta.env.VITE_BACKEND_URL +
              "/api/bookings/create-by-category",
            newBookingData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.status === 200) {
            localStorage.removeItem("pendingBookingData");
            toast.success("Booking placed successfully");

            clearFields();
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        } finally {
          setProcessing(false);
        }
      }
    }
  }

  function clearFields() {
    setStartDate("");
    setEndDate("");
    setCategory("");
  }

  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      {/* main background */}
      <div className="w-full max-h-[100vh] flex flex-col bg-purple-200">
        {/* client header */}
        <div className="fixed inset-x-0 top-0 z-10">
          <Header
            openLoginPopup={openLoginPopup}
            handleUserLogedOut={handleUserLogedOut}
            isUserLoggedIn={isUserLoggedIn}
            handleUserLogedIn={handleUserLogedIn}
          />
        </div>
        <Routes>
          <Route
            path="/home"
            element={
              <>
                {/* hero section */}
                <div className="w-full h-full pt-[70px] lg:pt-[100px] xl:pt-[120px]">
                  <HeroSection
                    today={today}
                    startDate={startDate}
                    endDate={endDate}
                    category={category}
                    categoriesData={categoriesData}
                    processing={processing}
                    handleStartDateChange={(e) => setStartDate(e.target.value)}
                    handleEndDateChange={(e) => setEndDate(e.target.value)}
                    handleCategoryChange={(e) => setCategory(e.target.value)}
                    handleBooking={handleBooking}
                  />
                </div>

                <div className="w-full h-full">
                  {/* room categories*/}
                  <RoomCategories categoriesData={categoriesData} />

                  {/* special offers */}
                  <SpecialOffers />

                  {/* image gallery */}
                  <ImageGallery />

                  {/* testimonials */}
                  <Testimonials feedbackData={feedbackData} />

                  {/* footer */}
                  <FooterSection />
                </div>
              </>
            }
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/feedback"
            element={<FeedbackPage feedbackData={feedbackData} />}
          />
          <Route path="/review" element={<CustomerFeedbackPage />} />

          <Route
            path="/bookings"
            element={<CustomerBookingPage categoriesData={categoriesData} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default HomePage;
