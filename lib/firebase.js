// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "login-babylon.firebaseapp.com",
  projectId: "login-babylon",
  storageBucket: "login-babylon.firebasestorage.app",
  messagingSenderId: "830558255377",
  appId: "1:830558255377:web:8839f345b90b82af7a74b0",
  measurementId: "G-N5HFB963B0"
};

// Initialise Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

//Initialise Auth + export it
export const auth = getAuth(app);