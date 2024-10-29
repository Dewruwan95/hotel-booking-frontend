import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG;
const bucketUrl = import.meta.env.VITE_FIREBASE_BUCKET_URL;

const app = initializeApp(firebaseConfig);

// Initialize Firebase storage
const storage = getStorage(app, bucketUrl);

export default storage;
