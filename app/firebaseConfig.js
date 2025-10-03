// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPH_33OfR9kORH4dENKlZcgIXC885P1Kc",
  authDomain: "soft-fs.firebaseapp.com",
  projectId: "soft-fs",
  storageBucket: "soft-fs.firebasestorage.app",
  messagingSenderId: "175739517749",
  appId: "1:175739517749:web:a48293986bb7782be12a7c",
  measurementId: "G-SREC65VK6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, analytics, auth };