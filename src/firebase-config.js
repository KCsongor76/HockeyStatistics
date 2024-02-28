import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBsxT3PNgWAU1K7J6QOVF4AmRwOnqqPb_Y",
  authDomain: "hockeystatistics-87eda.firebaseapp.com",
  projectId: "hockeystatistics-87eda",
  storageBucket: "hockeystatistics-87eda.appspot.com",
  messagingSenderId: "1090506214756",
  appId: "1:1090506214756:web:9217ba940df5a0176bbe71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
