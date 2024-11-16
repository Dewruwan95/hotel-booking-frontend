import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../config/Firebase";

async function uploadImages(files) {
  // If a single file is passed, wrap it in an array for consistency
  const fileArray = Array.isArray(files) ? files : [files];

  if (!fileArray.length) {
    console.error("No files provided for upload.");
    return []; // Return an empty array if no files are provided
  }

  try {
    // Upload all files concurrently
    const uploadPromises = fileArray.map(async (file) => {
      const timestamp = Date.now();
      const fileNameWithTimestamp = `${timestamp}_${file.name}`;

      // Create a reference in Firebase Storage
      const storageRef = ref(storage, fileNameWithTimestamp);

      // Upload file and get its download URL
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    });

    // Wait for all uploads to complete and collect the download URLs
    const downloadURLs = await Promise.all(uploadPromises);

    // Return a single URL if only one file was uploaded, or an array otherwise
    return downloadURLs.length === 1 ? downloadURLs[0] : downloadURLs;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images.");
  }
}

export default uploadImages;
