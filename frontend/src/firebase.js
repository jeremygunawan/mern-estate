// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3858c.firebaseapp.com",
  projectId: "mern-estate-3858c",
  storageBucket: "mern-estate-3858c.firebasestorage.app",
  messagingSenderId: "934230577097",
  appId: "1:934230577097:web:77eae7e89fa11ddaece218"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);