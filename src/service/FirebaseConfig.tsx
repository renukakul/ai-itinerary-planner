// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkV4cfEVMLOyw82oEmRjx7uwRfLjzg2o8",
  authDomain: "wanderwise-e97be.firebaseapp.com",
  projectId: "wanderwise-e97be",
  storageBucket: "wanderwise-e97be.firebasestorage.app",
  messagingSenderId: "666657596011",
  appId: "1:666657596011:web:01e52e8fac397c508d472e",
  measurementId: "G-0L92V31J03"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);