import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../config/Firebase";

async function uploadImage(file) {
  if (file) {
    try {
      // Add a timestamp to the file name
      const timestamp = Date.now();
      const fileNameWithTimestamp = `${timestamp}_${file.name}`;

      // Create a reference to the file location in Firebase Storage
      const storageRef = ref(storage, fileNameWithTimestamp);

      // Upload the file to the reference location
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  } else {
    return null;
  }
}

export default uploadImage;
