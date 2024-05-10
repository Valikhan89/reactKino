// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwAHalYiy9vWZ7sabkNrAw_prMmuPNLZU",
  authDomain: "project-kino-971ce.firebaseapp.com",
  projectId: "project-kino-971ce",
  storageBucket: "project-kino-971ce.appspot.com",
  messagingSenderId: "576743071138",
  appId: "1:576743071138:web:615bd8729e77e3683766fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export  const db = getFirestore(app);


