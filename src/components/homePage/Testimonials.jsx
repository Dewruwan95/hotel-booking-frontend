import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";

function Testimonials({ feedbackData }) {
  const defaultUserImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/mern-hotel-management.appspot.com/o/user.jpg?alt=media&token=bbb897b3-7773-4662-b9ae-2d0dc9b48a64";

  // Filter positive feedback and ensure only one feedback per user
  const positiveFeedback = Array.from(
    feedbackData
      .filter((item) => item.rating >= 4 && item.image !== defaultUserImageUrl)
      .reduce((map, feedback) => {
        // Use email or another unique identifier to ensure uniqueness
        if (!map.has(feedback.email)) {
          map.set(feedback.email, feedback);
        }
        return map;
      }, new Map())
      .values()
  );

  return (
    <>
      <div className="bg-purple-200 pt-[100px] pb-[250px] ">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-800 mb-5 lg:mb-16">
            What Our Guests Say
          </h2>
          <div className="flex flex-col justify-center">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2500,
                }),
              ]}
              className="w-full "
            >
              <CarouselContent className="mx-14 ">
                {positiveFeedback.map((feedback, index) => (
                  <CarouselItem
                    key={index}
                    className="p-1/2 lg:px-2 basis-[100%] lg:basis-1/2 xl:basis-1/3 "
                  >
                    <div className="p-1 mt-10 lg:mt-12">
                      <Card className="relative shadow-inner h-[380px] lg:h-[300px]">
                        <CardContent className="flex h-full flex-col items-center justify-center px-6 pt-[15px] lg:pt-[50px]">
                          {/* user image */}
                          <div className="absolute -top-[50px] md:-top-[60px] ">
                            <div
                              className="h-[100px] lg:h-[140px] w-[100px] lg:w-[140px] rounded-full bg-cover bg-center border-8 lg:border-[15px] border-purple-200 shadow-lg"
                              style={{
                                backgroundImage: `url(${feedback.image})`,
                              }}
                            ></div>
                          </div>
                          {/* feedback title */}
                          <div className="text-lg font-bold text-purple-900">
                            {feedback.title}
                          </div>
                          {/* feedback text */}
                          <div className="relative px-6 pt-2">
                            <BiSolidQuoteAltLeft className="absolute top-0 left-0 text-[20px] text-purple-400" />
                            <span className="text-gray-600">
                              {feedback.description}
                            </span>
                            <BiSolidQuoteAltRight className="absolute bottom-0 right-0 text-[20px] text-purple-400" />
                          </div>

                          <div className="absolute bottom-[10px]">
                            <div className="flex gap-4">
                              <span className="text-[18px] lg:text-[20px] font-bold text-purple-900">
                                {feedback.name}
                              </span>
                              <span className="flex justify-center items-center text-[18px] lg:text-[20px]">
                                {Array.from(
                                  { length: feedback.rating },
                                  (_, index) => (
                                    <AiFillStar
                                      key={index}
                                      className="text-yellow-500"
                                    />
                                  )
                                )}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonials;
