// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtq3LTqfOZRJs13nXf8T4thHl4hh2DtPA",
  authDomain: "route-65055.firebaseapp.com",
  projectId: "route-65055",
  storageBucket: "route-65055.appspot.com",
  messagingSenderId: "688529162791",
  appId: "1:688529162791:web:3ef1e755faa5874ec8c402",
  measurementId: "G-NQ3M87EHKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);