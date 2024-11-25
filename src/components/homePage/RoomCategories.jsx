import Marquee from "@/components/ui/marquee";

function RoomCategories({ categoriesData }) {
  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/mern-hotel-management.appspot.com/o/image.png?alt=media&token=0f157e0a-29be-4da3-90a6-6c9eb54720e4";

  // Filter out categories with the default image URL
  const filteredCategories = categoriesData.filter(
    (category) => category.image !== defaultImageUrl
  );

  // separate categories into two rows
  const firstRow = filteredCategories.slice(0, filteredCategories.length / 2);
  const secondRow = filteredCategories.slice(filteredCategories.length / 2);

  const CategoryCard = ({ name, image, description }) => {
    return (
      <div className="relative w-[300px] h-[300px] flex flex-col cursor-pointer overflow-hidden rounded-xl border  border-purple-500 bg-gray-950/[.01] hover:bg-purple-500/[.1]">
        <div className="flex flex-col items-center gap-2">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="h-[200px] w-[300px] rounded-[6px] bg-cover bg-center"
          ></div>
          <div className="flex flex-col px-4">
            <div className="text-sm font-medium text-purple-900">
              {description}
            </div>
          </div>
        </div>
        <div className="h-full text-md font-bold flex flex-col items-center justify-end pb-[10px] text-purple-600">
          {name}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-h-[100vh] bg-white pt-[60px] mb-[200px] md:mb-[80px]">
        <h2 className="text-center text-3xl font-bold text-purple-800 pb-[60px]">
          Our Room Categories
        </h2>
        {/* Category card marquee */}

        <div className="w-full h-full ">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
            <Marquee pauseOnHover className="[--duration:100s]">
              {firstRow.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:100s]">
              {secondRow.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomCategories;
