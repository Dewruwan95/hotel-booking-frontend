import { useState } from "react";
import uploadImage from "../../utils/MediaUpload";

function TestImageUpload() {
  const [file, setFile] = useState(null);

  //handle upload files function
  async function handleUpload() {
    if (file) {
      const downloadUrl = await uploadImage(file);

      if (downloadUrl) {
        console.log("Image uploaded to:", downloadUrl);
      } else {
        console.log("Image uploaded to:", downloadUrl);
      }
    }
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <input
        type="file"
        defaultValue={file}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default TestImageUpload;
