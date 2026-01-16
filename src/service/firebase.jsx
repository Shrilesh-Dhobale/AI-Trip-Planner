// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAgk9ncKJZOvbz474otZ3AgjqqSs7iTrA",
  authDomain: "ai-trip-planner-f6c5a.firebaseapp.com",
  projectId: "ai-trip-planner-f6c5a",
  storageBucket: "ai-trip-planner-f6c5a.firebasestorage.app",
  messagingSenderId: "62949978805",
  appId: "1:62949978805:web:4f0fab3d229bf5c18384fc",
  measurementId: "G-JJWB9LE9TB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
const analytics = getAnalytics(app);