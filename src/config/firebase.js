// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCv9lB6-AbNCoWF7X23SB0saQ1e3QucHy4",
  authDomain: "fir-course-10f85.firebaseapp.com",
  projectId: "fir-course-10f85",
  storageBucket: "fir-course-10f85.appspot.com",
  messagingSenderId: "736121465410",
  appId: "1:736121465410:web:1737e6b6878b43ede6dbdb",
  measurementId: "G-J6QZMFWVQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvidor = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)