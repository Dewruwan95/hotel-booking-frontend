import { Card, CardContent } from "@/components/ui/card";
import { AiFillStar } from "react-icons/ai";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
function FeedbackPage({ feedbackData }) {
  return (
    <div className="mt-[70px] lg:mt-[100px] xl:mt-[120px]">
      <div className="w-full min-h-screen bg-purple-100 py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
            Customer Feedbacks
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedbackData.map((feedback) => (
              <Card
                key={feedback._id}
                className="mt-[50px] relative shadow-inner h-[380px] lg:h-[300px]"
              >
                <CardContent className="flex h-full flex-col items-center justify-center px-6 pt-[15px] lg:pt-[50px]">
                  {/* user image */}
                  <div className="absolute -top-[50px] md:-top-[60px] ">
                    <div
                      className="h-[100px] md:h-[120px] lg:h-[140px] w-[100px] md:w-[120px] lg:w-[140px] rounded-full bg-cover bg-center border-8 lg:border-[15px] border-purple-100 shadow-lg"
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
                        {Array.from({ length: feedback.rating }, (_, index) => (
                          <AiFillStar key={index} className="text-yellow-500" />
                        ))}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
