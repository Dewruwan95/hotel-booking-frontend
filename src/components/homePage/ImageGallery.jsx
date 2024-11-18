import BlurFade from "@/components/ui/blur-fade";

function ImageGallery() {
  // Define images array
  const images = [
    "/gallery-image-landscape-1.jpg",
    "/gallery-image-portrait-2.jpg",
    "/gallery-image-portrait-1.jpg",
    "/gallery-image-landscape-2.jpg",
    "/gallery-image-landscape-3.jpg",
    "/gallery-image-portrait-3.jpg",
    "/gallery-image-portrait-4.jpg",
    "/gallery-image-landscape-4.jpg",
    "/gallery-image-landscape-5.jpg",
    "/gallery-image-portrait-5.jpg",
    "/gallery-image-portrait-6.jpg",
    "/gallery-image-landscape-6.jpg",
  ];
  return (
    <>
      <div className="container max-w-full mx-auto my-[40px] lg:my-[80px] p-4 lg:p-8 ">
        <div className="columns-2 gap-2 lg:columns-6 lg:gap-4">
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
              <img
                className="mb-4 size-full rounded-lg object-contain border-2 border-purple-300 shadow-md"
                src={imageUrl}
                alt={`Random stock image ${idx + 1}`}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </>
  );
}

export default ImageGallery;
