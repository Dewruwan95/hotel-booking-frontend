import imageCompression from "browser-image-compression";

// Function to resize and crop image to the specified dimensions
export async function resizeImage(file, targetWidth, targetHeight) {
  try {
    // Step 1: Compress and resize the image to a max size
    const options = {
      maxWidthOrHeight: 800, // Set max size for initial resizing (can be larger than target size)
      useWebWorker: true, // Enable web worker for performance
    };

    const compressedFile = await imageCompression(file, options);

    // Step 2: Crop the image to the desired target size (maintaining aspect ratio)
    const croppedImageBlob = await cropImageToExactDimensions(
      compressedFile,
      targetWidth,
      targetHeight
    );

    return croppedImageBlob; // Return the resized and cropped image as a Blob
  } catch (error) {
    console.error("Error resizing and cropping image:", error);
    throw error;
  }
}

// Function to crop and resize image to exact target dimensions (no stretching)
function cropImageToExactDimensions(file, targetWidth, targetHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Calculate the aspect ratio of the image
      const originalAspectRatio = img.width / img.height;
      const targetAspectRatio = targetWidth / targetHeight;

      let sx, sy, sw, sh; // Source x, y, width, height
      if (originalAspectRatio > targetAspectRatio) {
        // Image is too wide, crop the sides
        sh = img.height;
        sw = img.height * targetAspectRatio;
        sx = (img.width - sw) / 2; // Center crop horizontally
        sy = 0;
      } else {
        // Image is too tall, crop the top and bottom
        sw = img.width;
        sh = img.width / targetAspectRatio;
        sx = 0;
        sy = (img.height - sh) / 2; // Center crop vertically
      }

      // Set the canvas size to the desired target size
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw the image to the canvas with the cropping
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);

      // Convert the canvas to a Blob for upload
      canvas.toBlob((blob) => {
        resolve(blob); // Return the resized and cropped image as a Blob
      }, file.type);
    };

    img.onerror = (error) => reject(error);

    reader.readAsDataURL(file); // Read the file as a data URL
  });
}
